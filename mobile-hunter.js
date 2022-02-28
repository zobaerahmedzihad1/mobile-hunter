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

    const { image, phone_name, slug } = phone;

    const Phones = document.getElementById("phones");

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
          <div class="card h-100">
                  <img src="${image}" class="card-img-top" alt="...">
               <div class="card-footer badge bg-danger">
                   <h5 class="card-title text-center text-uppercase">${phone_name}</h5>
               </div>
               <div class="card-footer badge bg-light">
                    <button onclick = "showPhoneDetails('${slug}')" type="button" class="btn btn-outline-info">Show Details</button>
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

  const { chipSet, displaySize, memory } = phone.mainFeatures;

  const phoneDetails = document.getElementById("phone-details");
  //   empty phone details
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <div class="row g-0">
       <div class="col-md-4">
         <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
       </div>
       <div class="col-md-8">
         <div class="card-body">
           <h5 class="card-title"> ChipSet : ${chipSet}</h5>
           <h5 class="card-title">memory : ${memory}</h5>
           <p class="card-text">displaySize : ${displaySize}</p>
         </div>
       </div>
     </div>
  `;
  phoneDetails.appendChild(div);
};
