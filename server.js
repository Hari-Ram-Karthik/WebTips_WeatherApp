const { fork } = require("child_process");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 8000;
let allCityWeatherData;

///to send all cities timeZone
app.get("/all-timezone-cities", function (req, res) {
  // create a Child process using fork
  let allTimezon = fork(__dirname + "/childModule.js");
  allTimezon.on("message", (weatherinfo) => {
    allCityWeatherData = weatherinfo;
    res.json(weatherinfo);
  });
  allTimezon.send({ messagename: "GetAllTimeZone", messagebody: {} });
});

///to send html page and to send city time
app.get("/", (req, res) => {
  if (req.query.city) {
    // create a Child process using fork
    let cityInfo = fork(__dirname + "/childModule.js");
    cityInfo.on("message", (cityData) => {
      res.json(cityData);
    });
    cityInfo.send({
      messagename: "GetcityInfo",
      messagebody: { cityname: req.query.city },
    });
  } else if (req.url.endsWith("/")) {
    app.use(express.static("./"));
    res.sendFile(path.join(__dirname, "Weather.html"));
  } else {
    res
      .status(404)
      .json({ Error: "Not a valid EndPoint. Please check API Doc" });
  }
});

///to send hourly forecast for one city
app.post("/hourly-forecast", (req, res) => {
  if (req.body.city_Date_Time_Name && req.body.hours) {
    //create a Child process using fork
    let temperature = fork(__dirname + "/childModule.js");
    temperature.on("message", (nextFiveHrs) => {
      res.json(nextFiveHrs);
    });
    temperature.send({
      messagename: "GetNHourWeather",
      messagebody: {
        cityDTN: req.body.city_Date_Time_Name,
        hours: req.body.hours,
        weatherData: allCityWeatherData,
      },
    });
  } else {
    res
      .status(404)
      .json({ Error: "Not a valid EndPoint. Please check API Doc" });
  }
});

///to listen to server at given port
app.listen(PORT, (error) => {
  if (error) console.log("Error occurred, server can't start", error);
});
console.log(`Server running at http://127.0.0.1:${PORT}/`);
