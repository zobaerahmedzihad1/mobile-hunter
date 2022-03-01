const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");

// search phone
const searchField = document.getElementById("search-phones");
// display phones
const displayPhone = document.getElementById("phones");
// single phone details
const phoneDetails = document.getElementById("phone-details");

const searchPhones = () => {
  if (searchField.value == "") {
    error1.style.display = "block";
    error2.innerText = "";
    displayPhone.textContent = "";
    return;
  } else {
    error1.style.display = "none";
    error2.innerText = "";
    const searchText = searchField.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    //   console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPhones(data.data));
  }
};
// Display all phones
const displayPhones = (phones) => {
  displayPhone.textContent = "";
  if (!(phones.length == 0)) {
    phones.forEach((phone) => {
      //  console.log(phone);
      const { image, phone_name, slug, brand } = phone;
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
            <div class="card h-100">
                    <img src="${image}" class="card-img-top p-4 bg-light" alt="...">
                <div class="card-footer badge bg-info mb-2  text-dark mt-1">
                    <h5 class="card-title text-center  text-uppercase">${phone_name}</h5>
                </div>
                <div class=" badge">
                     <button onclick = "showPhoneDetails('${slug}')" type="button" class="btn btn-outline-info">Show Details</button>
                </div>
            </div>
            `;
      displayPhone.appendChild(div);
    });
  } else {
    error2.innerText = `No product found for "${searchField.value}" search result!`;
  }
  searchField.value = "";
};

const showPhoneDetails = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhonesDetails(data.data));
};

// Display single phone and details
const displayPhonesDetails = (phone) => {
  console.log(phone.releaseDate);
  console.log(phone);
  const { image, brand, name } = phone;

  // destucturing mainFeatures
  const { chipSet, displaySize, memory, sensors } = phone.mainFeatures;

  //   empty phone details
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <div class="row g-0 bg-light rounded ">
       <div class="col-md-4 p-2">
          <img src="${image}" class="img-fluid rounded-start ps-5" alt="...">
          <h5 class="card-text p-1 mt-2 border border-2 text-center rounded border-info">${name} </p5>
          <h5 class="card-text p-1 border border-2 text-center rounded border-info">${brand} </p5>
       </div>
 
       <div class="col-md-4">
         <div class="card-body">
           <h3> Main Features </h3
           <P class="card-title"> 1. CHIPSET : ${chipSet}</P>
           <P class="card-title"> 2. MEMORY : ${memory}</P>
           <p class="card-text"> 3. DISPLAY SIZE : ${displaySize}</p>
         </div>
       </div>
       
       <div id="sensor-container" class="card-body col-md-4">
       <h3 class = "mt-3"> Sensors </h3
        </div>
     </div>
     
  `;
  phoneDetails.appendChild(div);

  // sensor
  //   const allSensor = sensors;
  //   console.log(allSensor);
  const sensorDiv = document.getElementById("sensor-container");

  for (const sensor of sensors) {
    const sensorText = document.createElement("li");
    sensorText.innerText = `${sensor}`;
    sensorDiv.appendChild(sensorText);
  }
};
