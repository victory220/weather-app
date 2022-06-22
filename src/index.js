function addZeroToTime(str) {
  if (str < 10) {
    return `0${str}`;
  } else {
    return str;
  }
}

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "69a8934df3c12df0dc3ffddf1977ee44";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city) {
    search(city);
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
cityForm.addEventListener("submit", handleSubmit);

// Current location

let buttonCurrent = document.querySelector("#current-button");
buttonCurrent.addEventListener("click", getCurrentLocation);

search("London");
