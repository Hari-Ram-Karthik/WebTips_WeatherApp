/**
 *async function to fetch all city data from glitch
 */
const fetchAllCityData = async () => {
  await fetch("https://soliton.glitch.me/all-timezone-cities")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      allData = responseData;
    })
    .catch((error) => {
      alert("Error couldn't read data from glitch", error);
      location.reload();
    });
};

/**
 *async function to fetch hourly forecast from glitch
 * @param {*} cityName
 */
const getHourWeather = async (cityName) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = {
    city_Date_Time_Name: "7/19/2021, 3:48:49 AM, Nome",
    hours: 6,
  };
  await fetch("https://soliton.glitch.me?city=" + cityName)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      rawData = responseData;
    });
  raw.city_Date_Time_Name = rawData.city_Date_Time_Name;
  raw = JSON.stringify(raw);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  await fetch("https://soliton.glitch.me/hourly-forecast", requestOptions)
    .then((response) => response.json())
    .then((result) => (hourlyTemp = result))
    .catch((error) => {
      alert("Error couldn't read data from glitch", error);
      location.reload();
    });
};
