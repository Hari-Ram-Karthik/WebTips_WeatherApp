const fs = require("fs");
const http = require("http");
const path = require("path");
const { stringify } = require("querystring");
const {
  allTimeZones,
  timeForOneCity,
  nextNhoursWeather,
} = require("./timeZone.js");
const PORT = 8000;
let allCityWeatherData;
let cityData;
let hourlyForecast;

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const STATIC_PATH = path.join(process.cwd(), "./");

const toBool = [() => true, () => false];

/**
 *async function to load files
 * @param {*} url
 * @return {*} 
 */
const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("Weather.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

///crerating server and responce to requested url
http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    if (req.url === "/all-timezone-cities") {
      res.writeHead(200, { "Content-Type": "text/json" });
      allCityWeatherData=allTimeZones();
      res.write(JSON.stringify(allCityWeatherData));
      res.end();
    } else if (req.url.split("=")[0]==="/?city") {
      res.writeHead(200, { "Content-Type": "text/json" });
      let cityName=req.url.split("=")[1];
      cityData=timeForOneCity(cityName);
      res.write(JSON.stringify(cityData));
      res.end();
    } else if (req.url === "/hourly-forecast") {
      res.writeHead(200, { "Content-Type": "text/json" });
      if(cityData.city_Date_Time_Name){
        hourlyForecast=nextNhoursWeather(cityData.city_Date_Time_Name,6,allCityWeatherData);
        res.write(JSON.stringify(hourlyForecast));
        res.end();
      }
    }
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
