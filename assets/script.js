// points needed:
// by city
//current weather conditions - with icons
// date
// temp
//humidity
//wind speed
//UV index - with icon change color based on favorable moderat or severe


// Cards Section 5 day forcast 
// date, icon, temp, wind speed, humidity

//search history list of cities (calls data)

//weatherAPI call: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


var searchFormEl = document.querySelector("#searchForm")
var cityInputEl = document.querySelector("#inputCity");
var weatherContainerEl = document.querySelector("#weatherContainer");
var searchTermEl = document.querySelector("#return-city");
var listEl = document.querySelector("#winfo")
var cardContainerEl = document.querySelector(".card-container")

var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getWeatherData(city);
    //clears form data
    weatherContainerEl.textContent = "";
    cityInputEl.value = "";

  } else {
    alert("Please enter a US city")
  }
};

var getWeatherData = function (city1) {

  var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city1 + ",us&appid=59c9c59cda310911670e4ae16ffa7819&units=imperial";


  fetch(weatherApiUrl)
    .then(function (response) {
      return response.json();
      // var date = new Date(data.currnent.dt * 1000);
    })
    .then(function (weather) {

      displayWeather(weather, city1 + " ");

      coord(weather);

    })

    //   if (response.ok) {
    //     console.log(response);

    //   } else {
    //     alert("Error: city not found");
    //   }
    // })
    .catch(function (error) {
      console.error(error);
    })

};

var displayWeather = function (weather, searchTerm) {

  searchTermEl.textContent = weather.name;
  console.log();

//save to local storage
function searchHistory() {
  localStorage.setItem("city", searchTerm);
}
searchHistory()

// function getValue() {
//   return 
var cityEl = localStorage.getItem("city");
document.getElementById("history").innerHTML = cityEl

console.log(cityEl);
var cityName = cityEl
console.log(cityName);
var historyEl = document.createElement("button");
historyEl.classList = "btn btn-secondary";
// labelEl = getValue




  //get and format date\\
  var dateMain = weather.dt*1000;
  var dateObject1 = new Date(dateMain)
  var dateFormat = dateObject1.toLocaleString()
  var dateEl = document.getElementById("date-main")
  dateEl.textContent = "(" + dateFormat + ")";


  //get and display icon
 //var weatherIcon = weather[0].icon

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
  //humid
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
      
      var uviData = weather.current.uvi;

      var uviEl = document.getElementById("uv");
      uviEl.textContent = uviData;
    });
      //var forecastData = weather.daily.dt;
      //console.log(forecastData);
  
var dayCastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=59c9c59cda310911670e4ae16ffa7819&`

fetch(dayCastApi)
.then(function (response) {
  return response.json();
})
.then(function (data) {
 
  var forecastData = data.daily;
  console.log(forecastData);


//for (var i =0; i < forecastData.length; i++) {
  //var forecast = forecast[i].data.daily;
  //console.log(forecast)

  var displayForecast = function() {
    if (forecastData.length === 0) {
      cardContainerEl.textContent = "not found";
      return;
    }     
    for (var i =0; i < forecastData.length; i++) {
    var forecast = forecastData[i];
     //console.log(forecastData);
   
  
//transfer to cards
  var dateData = forecastData[i].dt*1000;
  var dateObject = new Date(dateData)
  var dateFormat = dateObject.toLocaleString()

  var cardDateEl = document.getElementById(`card-date-${i}`);
  //var cardDateEl = document.getElementById("date2");
  cardDateEl.textContent = dateFormat;
  // wind
  var iconData = forecastData[i].weather.icon;
  var iconEl = document.getElementById(`card-icon-${i}`);
  iconEl.textContent = iconData;

  var cardTempData = forecastData[i].temp.day;

  var cardTempEl = document.getElementById(`card-temp-${i}`);
  cardTempEl.textContent = cardTempData;
  // wind
  var cardWindData = forecastData[i].wind_speed;

  var cardWindEl = document.getElementById(`card-wind-${i}`);
  cardWindEl.textContent = cardWindData;
  
  //humid
  var humidData = forecastData[i].humidity;

  var humidEl = document.getElementById(`humid-${i}`);
  humidEl.textContent = humidData;
  
}
}

  displayForecast();
 }
  
)};

searchFormEl.addEventListener("submit", formSubmitHandler);



