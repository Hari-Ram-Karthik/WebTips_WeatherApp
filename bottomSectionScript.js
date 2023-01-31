document.getElementById("sort-name").addEventListener("click", sortByName);
document.getElementById("sort-temperature").addEventListener("click", sortByTemperature);
let sortContinentName=document.getElementById("sort-name");
let sortTemperature=document.getElementById("sort-temperature");
let continent = document.querySelector("#continent");
let allDataCopy = allData;
let timer;
(function iife() {
  createContinentCard();
  setTimeCityName();
  clearInterval(timer);
  timer = setInterval(setTimeCityName, 500);
})();
function createContinentCard() {
  let continentNumber = 0;
  document.getElementById("all-continents").replaceChildren();
  for (let i in allData) {
    let clone = continent.cloneNode(true);
    clone.id = "continent" + continentNumber;
    continent.before(clone);
    clone.querySelector("#continent-name").innerText =
      allDataCopy[i].timeZone.split("/")[0];
    clone.querySelector("#continent-temperature").innerText =
      allDataCopy[i].temperature;
    clone.querySelector("#city-name-time").id =
      "city-name-time" + continentNumber;
    clone.querySelector("#continent-humidity").innerText =
      allDataCopy[i].humidity;
    document.getElementById("all-continents").appendChild(clone);
    continentNumber++;
    if (continentNumber >= 12) break;
  }
}
function setTimeCityName() {
  let continentNumber = 0;
  for (let i in allDataCopy) {
    let timeZone = new Date().toLocaleString("en-US", {
      timeZone: allDataCopy[i].timeZone,
    });
    document.getElementById("city-name-time" + continentNumber).innerHTML =
      allDataCopy[i].cityName + ", " + getTime(timeZone);
    continentNumber++;
    if (continentNumber >= 12) break;
  }
}
function getTime(timeZone) {
  let time;
  let hour = new Date(timeZone).getHours();
  if (hour > 12) {
    time =
      String(hour - 12).padStart(2, "0") +
      ":" +
      String(new Date(timeZone).getMinutes()).padStart(2, "0") +
      " PM";
  } else if (hour == 0) {
    time =
      "12" +
      ":" +
      String(new Date(timeZone).getMinutes()).padStart(2, "0") +
      " AM";
  } else {
    time =
      String(hour).padStart(2, "0") +
      ":" +
      String(new Date(timeZone).getMinutes()).padStart(2, "0") +
      " AM";
  }
  return time;
}
function sortByName() {
  if (sortContinentName.name === "arrow-down"){
    sortContinentName.src = "Assets/arrowUp.svg";
    sortContinentName.name="arrow-up";
  }
  else {
    sortContinentName.src = "Assets/arrowDown.svg";
    sortContinentName.name="arrow-down";
  }
  // allDatacopy.sort(function (a, b) {
  //   if (a.timeZone.split("/")[0] < b.timeZone.split("/")[0]) {
  //     return -1;
  //   }
  //   if (a.timeZone.split("/")[0] > b.timeZone.split("/")[0]) {
  //     return 1;
  //   }
  //   return 0;
  // });
  createContinentCard();
  setTimeCityName();
  clearInterval(timer);
  timer = setInterval(setTimeCityName, 500);
}
function sortByTemperature(){
  if (sortTemperature.name === "arrow-down"){
    sortTemperature.src = "Assets/arrowUp.svg";
    sortTemperature.name="arrow-up";
  }
  else {
    sortTemperature.src = "Assets/arrowDown.svg";
    sortTemperature.name="arrow-down";
  }
}
