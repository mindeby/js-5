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
    constructor(firstName, lastName, email, city, mediumPic, largePic, cell, streetNumber, country, postcode, birthday) {
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
    }
  }






  //getting the required information for each employee
  function getEmployeeInfo(data){
    const employees = data.results;
    displayEmployeeInfo(employees)
  }

  let employeeCards = [];

  function displayEmployeeInfo(employees){
    employees.forEach(employee => {
      let firstName = employee.name.first;
      let lastName = employee.name.last;
      let email = employee.email;
      let city = employee.location.city;
      let mediumPic = employee.picture.medium;
      let largePic = employee.picture.large;
      let cell = employee.cell;
      let streetNumber = employee.location.street.number;
      let streetName = employee.location.street.name;
      let country = employee.location.country;
      let postcode = employee.location.postcode;
      let birthday = employee.dob.date;
      printHTML(mediumPic, firstName, lastName, email, city);
      printModal(largePic, firstName, lastName, email, city, cell, streetNumber, streetName, country, postcode, birthday);
    }); //modal elements
      let employeeCards = document.getElementsByClassName('card');
      for(i=0; i < employees.length; i+= 1) {
        let index = i;
        employeeCards[i].addEventListener('click', function(event) {

      })
    };
  };

  function printHTML(imageSource, firstName, lastName, email, city){
    let html = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${imageSource}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${city}</p>
        </div>
    </div>`
    employeeGallery.innerHTML += html;
  };

  fetchData('https://randomuser.me/api/?results=12')
  const employeeGallery = document.getElementById('gallery');

  //Creating modal window


  function printModal(imageSource, firstName, lastName, email, city, cell, streetNumber, streetName, country, postcode, birthday){
    //if (!document.getElementById('modal')){
      const modalWindow = document.createElement('DIV');
      modalWindow.setAttribute('id', "modal")
      document.body.insertBefore(modalWindow, employeeGallery.nextElementSibling) //insert before script tags
      let html = `<div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${imageSource}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
              <p class="modal-text">${email}</p>
              <p class="modal-text cap">${city}</p>
              <hr>
              <p class="modal-text">${cell}</p>
              <p class="modal-text">${streetNumber} ${streetName}, ${country}, ${postcode}</p>
              <p class="modal-text">Birthday: ${birthday}</p>
          </div>
      </div>

      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>`
      modalWindow.innerHTML += html;
    //}
  };



}); //End window listener
