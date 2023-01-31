document.getElementById("sunny-icon").addEventListener("click", sunnyIconClick);
document.getElementById("snow-icon").addEventListener("click", snowIconClick);
document.getElementById("rainy-icon").addEventListener("click", rainyIconClick);
let sunnyDataList;
let coldDataList;
let rainyDataList;
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
}
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
}
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
}