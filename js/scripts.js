document.addEventListener('DOMContentLoaded', () => { //wait until everything loaded
  //fetching data and checking for response
  function fetchData(url) {
    return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => getEmployeeInfo(data))
  }

  //check status of the response
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
      this.birthday = birthday.substring(0,10); //get first 10 characters only
      this.numberOfEmployee;
    }
    //creates individual cards with each employee general information
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

    //creates a modal with the selected employee detailed information
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
      modalWindow.style.display = 'block'; //when closed by modal-close-btn bring it back up
      document.body.insertBefore(modalWindow, employeeGallery.nextElementSibling) //insert before script tags
      modalWindow.innerHTML += html;
      //buttons: next, previous and closing, listener events
      document.getElementById('modal-next').addEventListener('click', function(){
        if (selectedEmployee < people.length-1){
          document.getElementById("modal").remove();
          selectedEmployee += 1;
          people[selectedEmployee].printModal(selectedEmployee)
        }
      })
      document.getElementById('modal-prev').addEventListener('click', function(){
          if(selectedEmployee >= 1){
            document.getElementById("modal").remove();
            selectedEmployee -= 1;
            people[selectedEmployee].printModal(selectedEmployee)
          }
      })
      document.getElementById('modal-close-btn').addEventListener('click', function(){
          document.getElementById("modal").style.display = 'none';
      })
    };
  }

  let people = []; //array with all employee objects

  //getting the required information from each employee
  function getEmployeeInfo(data){
    const employees = data.results;
    handleEmployeeInfo(employees)
  }

  function handleEmployeeInfo(employees){
    employees.forEach(employee => { //create a new instance of employee for each
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
    //setting number of employee property for each
    for (i=0; i<people.length;i+=1){
      index = i;
      people[i].numberOfEmployee = index;
    }
    //Add listener event to the cards
    let employeeCards = document.getElementsByClassName('card');
    for (i=0; i< employeeCards.length; i+=1){
      let index = i;
      employeeCards[i].addEventListener('click', function(event){
        selectedEmployee = index;
        people[selectedEmployee].printModal(selectedEmployee);
      })
    }
  };

  //General scope variables
  let selectedEmployee;
  const employeeGallery = document.getElementById('gallery');

  //implementing search bar
  const searchBar = document.getElementsByClassName('search-container')[0];
  searchBar.innerHTML += `<form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`;

  const searchField = document.getElementsByClassName('search-input')[0];

  searchField.addEventListener('keyup', function(){
    search = searchField.value.toLowerCase();
    let matches = [];
    let employeeCards = document.getElementsByClassName('card');
    for (i=0; i<people.length; i+=1){
      if (people[i].firstName.toLowerCase().indexOf(search) !== -1 || people[i].lastName.toLowerCase().indexOf(search) !== -1){
        matches.push(people[i].numberOfEmployee);
        for (i=0; i<employeeCards.length; i+=1){
          employeeCards[i].style.display = 'none';
        };
        for (i=0; i<matches.length; i+=1){
          employeeCards[matches[i]].style.display = 'block';
        };
      }
    }
    if(!search){
      for (i=0; i<employeeCards.length; i+=1){
        employeeCards[i].style.display = 'block';
      };
    }
  })

  //API call
  fetchData('https://randomuser.me/api/?results=12&nat=us,gb')
}); //End window listener
