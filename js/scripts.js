document.addEventListener('DOMContentLoaded', () => { //wait until everything loaded
  //fetching data and checking for response
  function fetchData(url) {
    return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => getEmployeeInfo(data))
  }

  function checkStatus(response){
    if (response.ok) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  class Employee {
    constructor(firstName, lastName, email, city, mediumPic, largePic, cell, streetNumber,streetName, country, postcode, birthday) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.city = city;
      this.mediumPic = mediumPic;
      this.largePic = largePic;
      this.cell = cell;
      this.streetNumber = streetNumber;
      this.streetName = streetName;
      this.country = country;
      this.postcode = postcode;
      this.birthday = birthday;
      this.numberOfEmployee;
    }

    printHTML(){
      let html = `<div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${this.mediumPic}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${this.firstName} ${this.lastName}</h3>
              <p class="card-text">${this.email}</p>
              <p class="card-text cap">${this.city}</p>
          </div>
      </div>`
      employeeGallery.innerHTML += html;
    }

    printModal(selectedEmployee){
      let html = `<div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${this.largePic}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${this.firstName} ${this.lastName}</h3>
              <p class="modal-text">${this.email}</p>
              <p class="modal-text cap">${this.city}</p>
              <hr>
              <p class="modal-text">${this.cell}</p>
              <p class="modal-text">${this.streetNumber} ${this.streetName}, ${this.country}, ${this.postcode}</p>
              <p class="modal-text">Birthday: ${this.birthday}</p>
          </div>
      </div>

      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>`
      const modalWindow = document.createElement('DIV');
      modalWindow.setAttribute('id', "modal")
      document.body.insertBefore(modalWindow, employeeGallery.nextElementSibling) //insert before script tags
      modalWindow.innerHTML += html;
      document.getElementById('modal-next').addEventListener('click', function(){
        document.getElementById("modal").remove();
        selectedEmployee += 1;
        people[selectedEmployee].printModal(selectedEmployee)
      })
      document.getElementById('modal-prev').addEventListener('click', function(){
        document.getElementById("modal").remove();
        selectedEmployee -= 1;
        people[selectedEmployee].printModal(selectedEmployee)
      })
    };
  }

  let people = [];

  //getting the required information from each employee
  function getEmployeeInfo(data){
    const employees = data.results;
    handleEmployeeInfo(employees)
  }

  function handleEmployeeInfo(employees){
    employees.forEach(employee => {
      let person = new Employee(employee.name.first,
                                employee.name.last,
                                employee.email,
                                employee.location.city,
                                employee.picture.medium,
                                employee.picture.large,
                                employee.cell,
                                employee.location.street.number,
                                employee.location.street.name,
                                employee.location.country,
                                employee.location.postcode,
                                employee.dob.date)
      people.push(person) //adding to array of objects
    });
    //print the html for each employee
    people.forEach(person => {
      person.printHTML();
    })
    //setting number of employee
    for (i=0; i<people.length;i+=1){
      index = i;
      people[i].numberOfEmployee = index;
    }
    //Add listener events
    let employeeCards = document.getElementsByClassName('card');
    for (i=0; i< employeeCards.length; i+=1){
      let index = i;
      employeeCards[i].addEventListener('click', function(event){
        selectedEmployee = index;
        people[selectedEmployee].printModal(selectedEmployee);
      })
    }
  };

  fetchData('https://randomuser.me/api/?results=12')
  const employeeGallery = document.getElementById('gallery');
  let selectedEmployee;


}); //End window listener
