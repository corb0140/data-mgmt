const APP = {
  apiUrl: "https://random-data-api.com/api/v2/users",

  init: function () {},

  fetchData: function () {},

  createElement: function () {},
};

(() => {
  //this function runs when the page loads
  //make the fetch call here or add a <button> to the HTML and
  //add a click listener to that button to make the fetch call
  //remember to handle any errors with the .catch() and display them in
  //a <dialog> or <popover>

  document.addEventListener("DOMContentLoaded", APP.init);
})();
