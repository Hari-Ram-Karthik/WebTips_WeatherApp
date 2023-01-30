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
let nowTemp = document.getElementById("now-temp");
let nextHourTemp = document.getElementById("next-hour-temp");
let secondHourTemp = document.getElementById("second-hour-temp");
let thirdHourTemp = document.getElementById("third-hour-temp");
let fourthHourTemp = document.getElementById("fourth-hour-temp");
let fifthHourTemp = document.getElementById("fivth-hour-temp");
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
    setNextFiveHoursTemp();
    setNextFiveHoursImage();
    setNextFiveHoursTime();
    setTime();
    clearInterval(timer);
    timer = setInterval(setTime, 500);
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
function setNextFiveHoursTemp() {
  nowTemp.innerText = allData[citySelected].temperature.split("°C", 1);
  nextHourTemp.innerText = allData[citySelected].nextFiveHrs[0].split("°C", 1);
  secondHourTemp.innerText = allData[citySelected].nextFiveHrs[1].split(
    "°C",
    1
  );
  thirdHourTemp.innerText = allData[citySelected].nextFiveHrs[2].split("°C", 1);
  fourthHourTemp.innerText = allData[citySelected].nextFiveHrs[3].split(
    "°C",
    1
  );
  fifthHourTemp.innerText = allData[citySelected].nextFiveHrs[3].split("°C", 1);
}
function setNextFiveHoursImage() {
  document.getElementById("now-hour-image").src = displayWeatherImage(
    nowTemp.textContent
  );
  document.getElementById("next-hour-image").src = displayWeatherImage(
    nextHourTemp.textContent
  );
  document.getElementById("second-hour-image").src = displayWeatherImage(
    secondHourTemp.textContent
  );
  document.getElementById("third-hour-image").src = displayWeatherImage(
    thirdHourTemp.textContent
  );
  document.getElementById("fourth-hour-image").src = displayWeatherImage(
    fourthHourTemp.textContent
  );
  document.getElementById("fivth-hour-image").src = displayWeatherImage(
    fifthHourTemp.textContent
  );
  function displayWeatherImage(temp) {
    if (temp >= 23 && temp <= 29)
      return "Assets/cloudyIcon.svg";
    if (temp < 18) return "Assets/rainyIcon.svg";
    if (temp >= 18 && temp <= 22)
      return "Assets/WindyIcon.svg";
    if (temp > 29) return "Assets/sunnyIcon.svg";
  }
}
function setNextFiveHoursTime() {
  let currentTimeZone = new Date().toLocaleString("en-US", {
    timeZone: allData[citySelected].timeZone,
  });
  let currentHour = new Date(currentTimeZone).getHours();
  for (let i = 0; i < 5; i++) {
    let time = document.getElementById("time-" + i);
    if (Number(currentHour) + i + 1 > 24) currentHour -= 24;
    if (Number(currentHour) + i + 1 < 12)
      time.innerText = Number(currentHour) + i + 1 + "AM";
    else if (Number(currentHour) + i + 1 == 12)
      time.innerText = Number(currentHour) + i + 1 + "PM";
    else if (Number(currentHour) + i + 1 == 24) time.innerText = +12 + "AM";
    else time.innerText = Number(currentHour) + i + 1 - 12 + "PM";
  }
}
function setTime() {
  let currentTimeZone = new Date().toLocaleString("en-US", {
    timeZone: allData[citySelected].timeZone,
  });
  let currentHour = new Date(currentTimeZone).getHours();
  if (currentHour >= 12) {
    document.getElementById("time-image").src =
      "Assets/pmState.svg";
    if (currentHour != 12) currentHour -= 12;
  } else if (currentHour == 0) {
    currentHour = 12;
    document.getElementById("time-image").src =
      "Assets/amState.svg";
  } else {
    document.getElementById("time-image").src =
      "Assets/amState.svg";
  }
  currentHour = String(currentHour).padStart(2, "0");
  let currentDate = document.getElementById("current-date");
  currentDate.innerText =
    String(new Date(currentTimeZone).getDate()).padStart(2, "0") +
    "-" +
    new Date().toLocaleString(
      "en-US",
      { month: "short" },
      { timeZone: currentTimeZone }
    ) +
    "-" +
    new Date(currentTimeZone).getFullYear();
  let currentTime = document.getElementById("current-time");
  currentTime.innerText =
    currentHour +
    ":" +
    String(new Date(currentTimeZone).getMinutes()).padStart(2, "0") +
    ":";
  let currentSecond = document.getElementById("current-second");
  currentSecond.innerText = String(
    new Date(currentTimeZone).getSeconds()
  ).padStart(2, "0");
  if (new Date(currentTimeZone).getMinutes() == 0) setNextFiveHoursTime();
}