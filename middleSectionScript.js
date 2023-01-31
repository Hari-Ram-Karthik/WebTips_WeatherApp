document.getElementById("sunny-icon").addEventListener("click", sunnyIconClick);
document.getElementById("snow-icon").addEventListener("click", snowIconClick);
document.getElementById("rainy-icon").addEventListener("click", rainyIconClick);
let sunnyDataList;
let coldDataList;
let rainyDataList;
let city = document.querySelector("#card");
let timer;
let currentDataList;
let timeZone;
/**
*function to execute when sunny icon is clicked
*/
function sunnyIconClick() {
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
  clearInterval(timer);
  timer = setInterval(createCard, 500, sunnyDataList, "sunnyIcon");
}
/**
 *function to execute when snow icon is clicked
 */
function snowIconClick() {
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
  clearInterval(timer);
  timer = setInterval(createCard, 500, coldDataList, "snowflakeIcon");
}
/**
 *function to execute when rainy icon is clicked
 */
function rainyIconClick() {
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
  clearInterval(timer);
  timer = setInterval(createCard, 500, rainyDataList, "rainyIcon");
}
/**
 *function to create cards
 * @param {*} dataList
 * @param {*} weatherCondition
 */
 function createCard(dataList, weatherCondition) {
  let cardNumber = 0;
  document.getElementById("all-cards").replaceChildren();
  for (let i in dataList) {
      let clone = city.cloneNode(true);
      clone.id = "card" + cardNumber;
      city.before(clone);
      clone.querySelector("#city-name").innerText = dataList[i].cityName;
      clone.querySelector("#city-temperature").innerText =
        dataList[i].temperature;
      clone.querySelector("#city-humidity").innerText = dataList[i].humidity;
      clone.querySelector("#city-precipitation").innerText =
        dataList[i].precipitation;
      clone.querySelector("#city-temp-image").src =
        "Assets/" + weatherCondition + ".svg";
      clone.setAttribute(
        "style",
        "background-image:url('Assets/" +
          dataList[i].cityName.toLowerCase() +
          ".svg')"
      );
      timeZone = new Date().toLocaleString("en-US", {
        timeZone: dataList[i].timeZone,
      });
      setDateTime(clone);
      clone.setAttribute(
        "style",
        "background-image:url('Assets/" +
          dataList[i].cityName.toLowerCase() +
          ".svg')"
      );
      document.getElementById("all-cards").appendChild(clone);
  }
}
/**
 *function to set date and time
 * @param {*} clone
 */
 function setDateTime(clone) {
  let hour = new Date(timeZone).getHours();
  if (hour > 12) {
    clone.querySelector("#city-time").innerText =
      hour -
      12 +
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
      hour +
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