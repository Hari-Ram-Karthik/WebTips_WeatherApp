document.getElementById("sort-name").addEventListener("click", sortByNameClick);
document
  .getElementById("sort-temperature")
  .addEventListener("click", sortByTemperatureClick);

/**
 *Prototype class
 */
class continentCard extends cardDetails {
  constructor(cityData) {
    super(cityData);
  }
}
let sortContinentName = document.getElementById("sort-name");
let sortTemperature = document.getElementById("sort-temperature");
let continent = document.querySelector("#continent");
let allDataCopy;
let timerBottom;
let continentCardObject;
/**
 *async function to wait to fetch data from glitch
 */
const asyncAwaitBottom = async () => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 3000);
  });
  allDataCopy = Object.values(allData);
  createContinentCard();
  setTimeCityName();
  clearInterval(timerBottom);
  timerBottom = setInterval(setTimeCityName, 500);
  sortContinent();
};

(function () {
  asyncAwaitBottom();
})();

/**
 *Function to create continent wise card
 */
function createContinentCard() {
  let continentNumber = 0;
  document.getElementById("all-continents").replaceChildren();
  for (let cityData in allDataCopy) {
    continentCardObject = new continentCard(allDataCopy[cityData]);
    let clone = continent.cloneNode(true);
    clone.id = "continent" + continentNumber;
    continent.before(clone);
    clone.querySelector("#continent-name").innerText = continentCardObject
      .getTimeZone()
      .split("/")[0];
    clone.querySelector("#continent-temperature").innerText =
      continentCardObject.getTemperature();
    clone.querySelector("#city-name-time").id =
      "city-name-time" + continentNumber;
    clone.querySelector("#continent-humidity").innerText =
      continentCardObject.getHumidity();
    document.getElementById("all-continents").appendChild(clone);
    continentNumber++;
    if (continentNumber >= 12) break;
  }
}

/**
 *Function to set time and city name
 */
function setTimeCityName() {
  let continentNumber = 0;
  for (let cityData in allDataCopy) {
    let timeZone = new Date().toLocaleString("en-US", {
      timeZone: allDataCopy[cityData].timeZone,
    });
    document.getElementById("city-name-time" + continentNumber).innerHTML =
      allDataCopy[cityData].cityName + ", " + getTime(timeZone);
    continentNumber++;
    if (continentNumber >= 12) break;
  }
}

/**
 *Function to return time
 * @param {*} timeZone
 * @return {*}
 */
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

/**
 *Function to work when sort by continent name is clicked
 */
function sortByNameClick() {
  if (sortContinentName.name === "arrow-down") {
    sortContinentName.src = "Assets/arrowUp.svg";
    sortContinentName.name = "arrow-up";
  } else {
    sortContinentName.src = "Assets/arrowDown.svg";
    sortContinentName.name = "arrow-down";
  }
  sortContinent();
}

/**
 *Function to work when sort by temperature is clicked
 */
function sortByTemperatureClick() {
  if (sortTemperature.name === "arrow-down") {
    sortTemperature.src = "Assets/arrowUp.svg";
    sortTemperature.name = "arrow-up";
  } else {
    sortTemperature.src = "Assets/arrowDown.svg";
    sortTemperature.name = "arrow-down";
  }
  sortContinent();
}

/**
 *Function to sort cards
 */
function sortContinent() {
  let continentNameOrder;
  let temperatureOrder;
  continentNameOrder =
    sortContinentName.name == "arrow-up" ? "Ascending" : "Descending";
  temperatureOrder =
    sortTemperature.name == "arrow-up" ? "Ascending" : "Descending";
  allDataCopy.sort(function (a, b) {
    if (a.timeZone.split("/")[0] < b.timeZone.split("/")[0]) {
      return -1;
    }
    if (a.timeZone.split("/")[0] > b.timeZone.split("/")[0]) {
      return 1;
    }
    return 0;
  });
  if (continentNameOrder == "Descending") {
    allDataCopy.reverse();
  }
  if (temperatureOrder == "Ascending") {
    allDataCopy.sort(function (a, b) {
      if (a.timeZone.split("/")[0] == b.timeZone.split("/")[0]) {
        if (
          Number(a.temperature.split("°C")[0]) <
          Number(b.temperature.split("°C")[0])
        ) {
          return -1;
        }
        if (
          Number(a.temperature.split("°C")[0]) >
          Number(b.temperature.split("°C")[0])
        ) {
          return 1;
        }
        return 0;
      }
    });
  } else {
    allDataCopy.sort(function (a, b) {
      if (a.timeZone.split("/")[0] == b.timeZone.split("/")[0]) {
        if (
          Number(a.temperature.split("°C")[0]) >
          Number(b.temperature.split("°C")[0])
        ) {
          return -1;
        }
        if (
          Number(a.temperature.split("°C")[0]) <
          Number(b.temperature.split("°C")[0])
        ) {
          return 1;
        }
        return 0;
      }
    });
  }
  createContinentCard();
  setTimeCityName();
  clearInterval(timerBottom);
  timerBottom = setInterval(setTimeCityName, 500);
}
