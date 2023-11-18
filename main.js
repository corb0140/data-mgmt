const APP = {
  searchBtn: document.getElementById("search-btn"),
  dataContainer: document.querySelector("pre"),
  url: "https://random-data-api.com/api/v2/users",

  init: function () {
    APP.searchBtn.addEventListener("click", APP.fetchData);
  },

  fetchData: function () {
    console.log("working");
    const apiUrl = `${APP.url}?size=50`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response found an error");
        }
        return response.json();
      })
      .then((filter) => {
        let states = filter.filter(
          (state) =>
            state.address.state === "Texas" ||
            state.address.state === "Alaska" ||
            state.address.state === "California"
        );

        console.log(states);
        return states;
      })
      .then((map) => {
        let mapObj = map.map((obj) => {
          return {
            uid: obj.uid,
            full_name: `${obj.first_name} ${obj.last_name}`,
            email: obj.email,
            dob: obj.date_of_birth,
            state: obj.address.state,
            city: obj.address.city,
            lat: obj.address.coordinates.lat,
            lng: obj.address.coordinates.lng,
          };
        });

        console.log(mapObj);
        APP.buildHTML(mapObj);
      })
      .catch((err) => {
        APP.errorHandler(err);
      });
  },

  buildHTML: function (data) {
    APP.dataContainer.innerHTML = "";
    let userList = new DocumentFragment();

    data.forEach((data, index) => {
      let div = document.createElement("div");
      div.classList.add("card");

      div.innerHTML = `
      <h1 class="card__title"> ${data.full_name} </h1>
      <div class="card__content">
      <p class="card__text"> Uid: ${data.uid}</p>
      <p class="card__text"> Email: ${data.email}</p>
      <p class="card__text"> D.o.B: ${data.dob}</p>
      <p class="card__text"> City: ${data.city}</p>
      <p class="card__text"> State: ${data.state}</p>
      <p class="card__text"> Latitude: ${data.lat}</p>
      <p class="card__text"> Longitude: ${data.lng}</p>
      </div>
      `;

      userList.appendChild(div);
    });

    APP.dataContainer.appendChild(userList);
  },

  errorHandler: (err) => {
    APP.dataContainer.innerHTML = `<dialog>${err}</dialog>`;
  },
};

(() => {
  //this function runs when the page loads
  //make the fetch call here or add a <button> to the HTML and
  //add a click listener to that button to make the fetch call
  //remember to handle any errors with the .catch() and display them in
  //a <dialog> or <popover>

  document.addEventListener("DOMContentLoaded", APP.init);
})();
