function addZeroToTime(str) {
  if (str < 10) {
    return `0${str}`;
  } else {
    return str;
  }
}

function showWeather(response) {
  // console.log(response);
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  // console.log(cityName, temperature, description, humidity, wind);

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = cityName;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = description;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let currentWind = document.querySelector("#wind-speed");
  currentWind.innerHTML = `Wind: ${wind} m/s`;
}

function getCityWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  if (cityInput.value) {
    let apiKey = "69a8934df3c12df0dc3ffddf1977ee44";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  } else {
    alert("Please type a city");
  }
}

function getLocationWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "69a8934df3c12df0dc3ffddf1977ee44";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getLocationWeather);
}

// Date

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let day = days[now.getDay()];
let hours = addZeroToTime(now.getHours());
let minutes = addZeroToTime(now.getMinutes());
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

// City

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", getCityWeather);

// Current location

let buttonCurrent = document.querySelector("#current-button");
buttonCurrent.addEventListener("click", getCurrentLocation);
