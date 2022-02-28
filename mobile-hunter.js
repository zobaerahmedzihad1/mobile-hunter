const searchPhones = () => {
  const searchField = document.getElementById("search-phones");
  const searchText = searchField.value;
  searchField.value = "";

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  //   console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhones(data.data));
};

// Display all phones
const displayPhones = (phones) => {
  phones.forEach((phone) => {
    //  console.log(phone);

    const { image, phone_name, slug, brand } = phone;

    const Phones = document.getElementById("phones");

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
          <div class="card h-100">
                  <img src="${image}" class="card-img-top" alt="...">
               <div class="card-footer badge bg-danger">
                   <h5 class="card-title text-center text-uppercase">${phone_name}</h5>
               </div>
               <div class="card-footer badge bg-info mt-1">
                   <h5 class="card-title text-center text-uppercase">${brand}</h5>
               </div>
               <div class="card-footer badge bg-light">
                    <button onclick = "showPhoneDetails('${slug}')" type="button" class="btn btn-outline-primary">Show Details</button>
               </div>
          </div>
          `;
    Phones.appendChild(div);
  });
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

  const { chipSet, displaySize, memory, sensors } = phone.mainFeatures;
  console.log(sensors);

  sensors.forEach((sensor) => {
//     console.log(sensor);



  });

  const phoneDetails = document.getElementById("phone-details");
  //   empty phone details
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <div class="row g-0 ">
       <div class="col-md-4 p-2">
         <img src="${image}" class="img-fluid rounded-start ps-5" alt="...">
         <h5 class="card-text p-1 mt-2 border border-2 text-center rounded border-info">${name} </p5>
         <h5 class="card-text p-1 border border-2 text-center rounded border-info">${brand} </p5>
       </div>
       <div class="col-md-4">
         <div class="card-body">
           <P class="card-title"> 1. CHIPSET : ${chipSet}</P>
           <P class="card-title"> 2. MEMORY : ${memory}</P>
           <p class="card-text"> 3. DISPLAY SIZE : ${displaySize}</p>
         </div>
         
       </div>
     </div>
  `;
  phoneDetails.appendChild(div);
};
