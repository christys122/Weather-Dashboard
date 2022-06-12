//Global var
var searchFormEl = document.querySelector("#searchForm")
var cityInputEl = document.querySelector("#inputCity");
var weatherContainerEl = document.querySelector("#weatherContainer");
var searchTermEl = document.querySelector("#return-city");
var listEl = document.querySelector("#winfo")
var cardContainerEl = document.querySelector(".card-container")


//start search based on city input
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getWeatherData(city);

//clears form data
    weatherContainerEl.textContent = "";
    cityInputEl.value = "";
//if blank or not a city
  } else {
    alert("Please enter a US city")
  }
};

//define api with key
var getWeatherData = function (city1) {

  var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city1 + ",us&appid=59c9c59cda310911670e4ae16ffa7819&units=imperial";

  fetch(weatherApiUrl)
    .then(function (response) {
      return response.json();
  
    })
    .then(function (weather) {
//functions based on api
      displayWeather(weather, city1 + " ");

      coord(weather);
    })
  } 

//Main weather section
var displayWeather = function (weather, searchTerm) {

  searchTermEl.textContent = weather.name;
  console.log();

//save to local storage
function searchHistory() {
  localStorage.setItem("city", searchTerm);
}
searchHistory()

var cityEl = localStorage.getItem("city");
document.getElementById("history").innerHTML = cityEl

console.log(cityEl);
var cityName = cityEl
console.log(cityName);
var historyEl = document.createElement("button");
historyEl.classList = "btn btn-secondary";


//get and format date
  var dateMain = weather.dt*1000;
  var dateObject1 = new Date(dateMain)
  var dateFormat = dateObject1.toLocaleString()
  var dateEl = document.getElementById("date-main")
  dateEl.textContent = "(" + dateFormat + ")";


  //get and display icon
  var weatherIcon = document.getElementById("icon")
  var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  weatherIcon.setAttribute('src', iconUrl);


//update weather info
  var tempData = weather.main.temp;
  var tempEl = document.getElementById("temp");
  tempEl.textContent = tempData;

  // wind
  var windData = weather.wind.speed;
  var windEl = document.getElementById("wind");
  windEl.textContent = windData;

  //humidity
  var humidityData = weather.main.humidity;
  var humidityEl = document.getElementById("humidity");
  humidityEl.textContent = humidityData;

};

//fetch coord
var coord = function (weather) {

  //latlon
  var lat = weather.coord.lat;
  console.log(lat);
  var lon = weather.coord.lon;
  console.log(lon);

  var oneApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=59c9c59cda310911670e4ae16ffa7819&units=imperial`

  fetch(oneApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
     
    //set uv data
      var uviData = weather.current.uvi;
      var uviEl = document.getElementById("uv");
      uviEl.textContent = uviData;
    });
      
 //api call for 5 day forcast cards 
var dayCastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=59c9c59cda310911670e4ae16ffa7819&`

fetch(dayCastApi)
.then(function (response) {
  return response.json();
})
.then(function (data) {
 
  var forecastData = data.daily;
  console.log(forecastData);

  var displayForecast = function() {
    if (forecastData.length === 0) {
      cardContainerEl.textContent = "not found";
      return;
    }     
    for (var i =0; i < forecastData.length; i++) {
    var forecast = forecastData[i];
    
   
//transfer to cards
//format date
  var dateData = forecastData[i].dt*1000;
  var dateObject = new Date(dateData)
  var dateFormat = dateObject.toLocaleString()
  var cardDateEl = document.getElementById(`card-date-${i}`);
  cardDateEl.textContent = dateFormat;

  // set icons
  var iconData = `https://openweathermap.org/img/w/${forecastData[i].weather[0].icon}.png`;
  var iconEl = document.getElementById(`card-icon-${i}`);
  iconEl.setAttribute('src', iconData);
  
  //set temp to cards
  var cardTempData = forecastData[i].temp.day;
  var cardTempEl = document.getElementById(`card-temp-${i}`);
  cardTempEl.textContent = cardTempData;

  // wind speed
  var cardWindData = forecastData[i].wind_speed;
  var cardWindEl = document.getElementById(`card-wind-${i}`);
  cardWindEl.textContent = cardWindData;
  
  //humidity
  var humidData = forecastData[i].humidity;
  var humidEl = document.getElementById(`humid-${i}`);
  humidEl.textContent = humidData;
  
}
}

  displayForecast();
 }
  
)};
//button to start search after city is entered
searchFormEl.addEventListener("submit", formSubmitHandler);



