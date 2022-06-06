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
var weatherContainerEl = document.querySelector(".weatherContainer");

//var city = document.getElementById("inputCity").value.trim();
//console.log(city);
var formSubmitHandler = function(event) {
  event.preventDefault();
var city = cityInputEl.value.trim();
  if (city) {
    getWeatherData(city);
    cityInputEl.textContent = "";

  } else {
    alert("Please enter a US city")
  }
};

var getWeatherData = function(city1) {
 // event.preventDefault();
 var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city1 + ",us&callback=test&appid=59c9c59cda310911670e4ae16ffa7819&units=imperial";


    fetch(weatherApiUrl) //"https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=59c9c59cda310911670e4ae16ffa7819&units=imperial");
      .then(function(response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            displayWeather(data, city1)
          });
        } else {
          alert("Error: city not found");
        }
      })
      .catch(function(error) {
        alert("Unable to connect to Weather")
      });
  };
  
  var displayWeather = function(weather, searchTerm) {
    if (weather.length === 0) {
     weatherContainerEl.textContent ="not found";
     return; 
    }
//format repo

  };
  //getWeatherData();
  searchFormEl.addEventListener("submit", formSubmitHandler);