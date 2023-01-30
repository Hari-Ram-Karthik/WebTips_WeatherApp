document
let cityOptions = document.getElementById("city-select");
(function iife() {
  for (let x in allData) {
    cityOptions.innerHTML =
      cityOptions.innerHTML + '<option value="' + allData[x].cityName + '">';
  }
})();
