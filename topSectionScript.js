document
  .getElementById("city-selected")
  .addEventListener("change", citySelectChange);
let timer;
let cityOptionSelected = document.getElementById("city-selected");
let citySelected;
let cityOptions = document.getElementById("city-select");
let tempC = document.getElementById("temp-c");
let tempF = document.getElementById("temp-f");
let humidity = document.getElementById("humidity");
let precipitation = document.getElementById("precipitation");
(function iife() {
  for (let x in allData) {
    cityOptions.innerHTML =
      cityOptions.innerHTML + '<option value="' + allData[x].cityName + '">';
  }
})();
(function () {
  citySelectChange();
})();
function citySelectChange() {
  citySelected = cityOptionSelected.value.toLowerCase();
  setValues();
}
function setValues() {
  document.getElementById("selected-city-image").src =
    "Assets/" + citySelected + ".svg";
  setTempPrecipitation();
}
function setTempPrecipitation() {
  let tempFValue;
  tempC.innerText = allData[citySelected].temperature;
  tempFValue = tempC.textContent.split("°C", 1);
  tempFValue = (tempFValue * 1.8 + 32).toFixed(1);
  tempF.innerText = tempFValue + "°F";
  humidity.innerText = allData[citySelected].humidity;
  precipitation.innerText = allData[citySelected].precipitation;
}