const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
const {
  allTimeZones,
  timeForOneCity,
  nextNhoursWeather,
} = require("./timeZone.js");
const PORT = 8000;
let allCityWeatherData;

///to send all cities timeZone
app.get("/all-timezone-cities", (req, res) => {
  allCityWeatherData = allTimeZones();
  res.json(allCityWeatherData);
});

///to send html page and to send city time
app.get("/", (req, res) => {
  if (req.query.city) {
    res.json(timeForOneCity(req.query.city));
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
    res.json(
      nextNhoursWeather(
        req.body.city_Date_Time_Name,
        req.body.hours,
        allCityWeatherData
      )
    );
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
