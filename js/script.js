// current data and time//////////////////////////////////////////////////
let now = new Date()
// console.log(now);
// console.log(now.toLocaleDateString());

let hour =
  now.getHours().toString().length < 2 ? '0' + now.getHours() : now.getHours()
let min =
  now.getMinutes().toString().length < 2
    ? '0' + now.getMinutes()
    : now.getMinutes()
let currentTime = `${hour}:${min}`
let actualTime = document.querySelector('#current-time')
actualTime.innerHTML = currentTime

let currentDay = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
let actualDay = document.querySelector('#current-name-day')
actualDay.innerHTML = currentDay[now.getDay()]

let actualData = document.querySelector('#current-data')
actualData.innerHTML = now.toLocaleDateString()

// change city name ///////////////////////////////////////////////////


function replaceCity(event) {
  event.preventDefault()
  let newCityName = document.querySelector('#city-name-input')
  let replaceCityName = document.querySelector('#city-name')
  if (newCityName.value.toString().length > 0) {
    replaceCityName.innerHTML = newCityName.value.toString().toUpperCase()
  } else {
    replaceCityName.innerHTML = 'KYIV'
  }
}

let searchingForm = document.querySelector('.signin-form')
searchingForm.addEventListener('submit', replaceCity)
searchingForm.addEventListener('submit', displayWeather)
let searchingButton = document.querySelector('.search-button')
searchingButton.addEventListener('click', replaceCity)
searchingButton.addEventListener('click', displayWeather)

// api weather////////////////////////////////////////////////////////////////


function displayWeather(response) {
  let apiKey = 'a43564c91a6c605aeb564c9ed02e3858'
  let newCityName = document.querySelector('#city-name-input')
  let city = newCityName.value.toString()
  console.log(city)
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  console.log(url)
  axios.get(url).then(showTemperature)
  axios.get(url).then(showHumidity)
  axios.get(url).then(showFeelsTemp)
  axios.get(url).then(showWind)
}



// geolocation//////////////////////////////////////////////////////

function getPosition(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let apiKey = 'a43564c91a6c605aeb564c9ed02e3858'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  console.log(apiUrl)
  axios.get(apiUrl).then(showTemperature)
  axios.get(apiUrl).then(showHumidity)
  axios.get(apiUrl).then(showFeelsTemp)
  axios.get(apiUrl).then(showWind)
  axios.get(apiUrl).then(showCityName);
}

function showCityName(response) {
  let currentCityName = response.data.name
  console.log(response)
  let cityName = document.querySelector('#city-name')
  cityName.innerHTML = currentCityName
}


function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp)
  let temp = document.querySelector('.temp')
  temp.innerHTML = temperature
}

function showHumidity(response) {
  let humidity = response.data.main.humidity
  let humid = document.querySelector('#humidity')
  humid.innerHTML = humidity
}

function showFeelsTemp(response) {
  let feelsTemp = Math.round(response.data.main.feels_like)
  let feelsTemperature = document.querySelector('#feels_like')
  feelsTemperature.innerHTML = feelsTemp
}

function showWind(response) {
  let wind = Math.round(response.data.wind.speed)
  let speedWind = document.querySelector('#wind')
  speedWind.innerHTML = wind
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let buttGeolocation = document.querySelector('.location-button')
buttGeolocation.addEventListener('click', getCurrentLocation)

// temperature units////////////////////////////////////////////////////////////
let buttFar = document.querySelector('.temperature-units-far')
let buttCel = document.querySelector('.temperature-units-cel')

let tempUnit = document.querySelector('.temp')

function changeUnitFar() {
  tempUnit.innerHTML = 68
}

function changeUnitCel() {
  tempUnit.innerHTML = 20
}

buttFar.addEventListener('click', changeUnitFar)
buttCel.addEventListener('click', changeUnitCel)
