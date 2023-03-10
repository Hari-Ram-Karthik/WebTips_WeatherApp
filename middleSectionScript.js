document.getElementById("sunny-icon").addEventListener("click", sunnyIconClick);
document.getElementById("snow-icon").addEventListener("click", snowIconClick);
document.getElementById("rainy-icon").addEventListener("click", rainyIconClick);
document.getElementById("display-count").addEventListener("click", countChange);
document
  .getElementById("navigate-right")
  .addEventListener("click", () => navigator(299.5));
document
  .getElementById("navigate-left")
  .addEventListener("click", () => navigator(-299.5));
window.addEventListener("resize", countChange);
/**
 *Prototype class
 */
class cardDetails extends cityData {
  constructor(cityData) {
    super(cityData);
  }
}
let sunnyDataList;
let coldDataList;
let rainyDataList;
let city = document.querySelector("#card");
let timerMiddle;
let numberOfCards = 3;
let currentDataList;
let timeZone;
let cardObject;
let loadDataCard;
/**
 *function to sleep
 * @param {*} ms
 * @return {*} timeout
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 *function to navigate through cards(to move)
 * @param {*} value
 */
async function navigator(value) {
  for (let i = 0; i < 10; i++) {
    await sleep(80);
    document.getElementById("all-cards-with-navigate").scrollLeft += value / 10;
  }
}

/**
 *function to execute when sunny icon is clicked
 */
function sunnyIconClick() {
  numberOfCards = 3;
  document.getElementById("display-count").value = 3;
  document
    .getElementById("sunny-icon")
    .setAttribute(
      "style",
      "border-bottom-color:#00c0f1;border-bottom-style:solid"
    );
  document.getElementById("snow-icon").setAttribute("style", "");
  document.getElementById("rainy-icon").setAttribute("style", "");
  sunnyDataList = Object.values(allData).filter(
    (city) =>
      Number(city.precipitation.split("%")[0]) >= 50 &&
      Number(city.humidity.split("%")[0]) < 50 &&
      Number(city.temperature.split("°C")[0]) > 29
  );
  sunnyDataList.sort(
    (a, b) => b.temperature.split("°C")[0] - a.temperature.split("°C")[0]
  );
  currentDataList = sunnyDataList;
  createCard(sunnyDataList, "sunnyIcon");
  clearInterval(timerMiddle);
  timerMiddle = setInterval(createCard, 500, sunnyDataList, "sunnyIcon");
}

/**
 *function to execute when snow icon is clicked
 */
function snowIconClick() {
  numberOfCards = 3;
  document.getElementById("display-count").value = 3;
  document
    .getElementById("snow-icon")
    .setAttribute(
      "style",
      "border-bottom-color:#00c0f1;border-bottom-style:solid"
    );
  document.getElementById("sunny-icon").setAttribute("style", "");
  document.getElementById("rainy-icon").setAttribute("style", "");
  coldDataList = Object.values(allData).filter(
    (city) =>
      Number(city.precipitation.split("%")[0]) < 50 &&
      Number(city.humidity.split("%")[0]) > 50 &&
      Number(city.temperature.split("°C")[0]) > 20 &&
      Number(city.temperature.split("°C")[0]) < 28
  );
  coldDataList.sort(
    (a, b) => b.precipitation.split("%")[0] - a.precipitation.split("%")[0]
  );
  currentDataList = coldDataList;
  createCard(coldDataList, "snowflakeIcon");
  clearInterval(timerMiddle);
  timerMiddle = setInterval(createCard, 500, coldDataList, "snowflakeIcon");
}

/**
 *function to execute when rainy icon is clicked
 */
function rainyIconClick() {
  numberOfCards = 3;
  document.getElementById("display-count").value = 3;
  document
    .getElementById("rainy-icon")
    .setAttribute(
      "style",
      "border-bottom-color:#00c0f1;border-bottom-style:solid"
    );
  document.getElementById("sunny-icon").setAttribute("style", "");
  document.getElementById("snow-icon").setAttribute("style", "");
  rainyDataList = Object.values(allData).filter(
    (city) =>
      Number(city.humidity.split("%")[0]) >= 50 &&
      Number(city.temperature.split("°C")[0]) < 20
  );
  rainyDataList.sort(
    (a, b) => b.humidity.split("%")[0] - a.humidity.split("%")[0]
  );
  currentDataList = rainyDataList;
  createCard(rainyDataList, "rainyIcon");
  clearInterval(timerMiddle);
  timerMiddle = setInterval(createCard, 500, rainyDataList, "rainyIcon");
}

/**
 *function to create cards
 * @param {*} dataList
 * @param {*} weatherCondition
 */
function createCard(dataList, weatherCondition) {
  let cardNumber = 0;
  document.getElementById("all-cards").replaceChildren();
  for (let cityData in dataList) {
    if (cardNumber + 1 <= numberOfCards || cardNumber <= 2) {
      cardObject = new cardDetails(dataList[cityData]);
      let clone = city.cloneNode(true);
      clone.id = "card" + cardNumber;
      city.before(clone);
      clone.querySelector("#city-name").innerText = cardObject.getCityName();
      clone.querySelector("#city-temperature").innerText =
        cardObject.getTemperature();
      clone.querySelector("#city-humidity").innerText =
        cardObject.getHumidity();
      clone.querySelector("#city-precipitation").innerText =
        cardObject.getPrecipitation();
      clone.querySelector("#city-temp-image").src =
        "Assets/" + weatherCondition + ".svg";
      timeZone = new Date().toLocaleString("en-US", {
        timeZone: cardObject.getTimeZone(),
      });
      setDateTime(clone);
      clone.setAttribute(
        "style",
        "background-image:url('Assets/" +
          dataList[cityData].cityName.toLowerCase() +
          ".svg')"
      );
      cardNumber++;
      document.getElementById("all-cards").appendChild(clone);
    }
  }
  countChange();
}

/**
 *function to set date and time
 * @param {*} clone
 */
function setDateTime(clone) {
  let hour = new Date(timeZone).getHours();
  if (hour > 12) {
    clone.querySelector("#city-time").innerText =
      String(hour - 12).padStart(2, "0") +
      ":" +
      String(new Date(timeZone).getMinutes()).padStart(2, "0") +
      " PM";
  } else if (hour == 0) {
    clone.querySelector("#city-time").innerText =
      "12" +
      ":" +
      String(new Date(timeZone).getMinutes()).padStart(2, "0") +
      " AM";
  } else {
    clone.querySelector("#city-time").innerText =
      String(hour).padStart(2, "0") +
      ":" +
      String(new Date(timeZone).getMinutes()).padStart(2, "0") +
      " AM";
  }
  clone.querySelector("#city-date").innerText =
    String(new Date(timeZone).getDate()).padStart(2, "0") +
    "-" +
    new Date().toLocaleString(
      "en-US",
      { month: "short" },
      { timeZone: timeZone }
    ) +
    "-" +
    new Date(timeZone).getFullYear();
}

/**
 *function to execute when card count changes
 */
function countChange() {
  numberOfCards = document.getElementById("display-count").value;
  let displayCount =
    numberOfCards < currentDataList.length
      ? numberOfCards
      : currentDataList.length;
  if (
    displayCount * 282 >=
    document.getElementById("all-cards-with-navigate").clientWidth
  ) {
    document
      .getElementById("navigate-left")
      .setAttribute("style", "visibility:visible");
    document
      .getElementById("navigate-right")
      .setAttribute("style", "visibility:visible");
    document
      .getElementById("all-cards")
      .setAttribute("style", "width:fit-content");
  } else {
    document
      .getElementById("navigate-left")
      .setAttribute("style", "visibility:hidden");
    document
      .getElementById("navigate-right")
      .setAttribute("style", "visibility:hidden");
    document
      .getElementById("all-cards")
      .setAttribute("style", "justify-content:center");
  }
}
