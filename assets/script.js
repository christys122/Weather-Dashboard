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
var searchTermEl = document.querySelector("#returnCity");
var listEl = document.querySelector("#winfo")


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

      displayWeather(weather, city1);
      
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
  


  searchTermEl.textContent = searchTerm;
  //select each item using loop


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
//fetch latlon
var coord = function(weather) {
  
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
    .then(function(weather){
      console.log(weather);
      var uviData = weather.current.uvi;
    
  var uviEl = document.getElementById("uv");
  uviEl.textContent = uviData;
    })
    
  
};






searchFormEl.addEventListener("submit", formSubmitHandler);



