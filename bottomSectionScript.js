let continent = document.querySelector("#continent");
let allDataCopy = allData;
(function iife() {
  createContinentCard();
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
    let cityNameWithTime;
    cityNameWithTime = allDataCopy[i].cityName;
    let timeZone = new Date().toLocaleString("en-US", {
      timeZone: allDataCopy[i].timeZone,
    });
    cityNameWithTime += ", ";
    cityNameWithTime += setTime(timeZone);
    clone.querySelector("#city-name-time").innerText = cityNameWithTime;
    clone.querySelector("#continent-humidity").innerText =
      allDataCopy[i].humidity;
    document.getElementById("all-continents").appendChild(clone);
    continentNumber++;
    if (continentNumber >= 12) break;
  }
}
function setTime(timeZone) {
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
