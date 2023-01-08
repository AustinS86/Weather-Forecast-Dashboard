
var today =dayJS();
var currentDay =(today.format('MM/DD/YYYY'));
var city = [];
var listofCities = $("city-list");
var listofCitiesButton =$('#city-search-button')
//var date = dayJS().format('dddd, MMMM Do YYYY');
//var time = dayJS().format('YYYY-MM-DD');

function displayWeather(event){
    event.preventDefault();
    if (listofCities.val().trim() !==""){
        city = listofCities.val().trim();
        currentWeather(city);

        var cityList =document.getElementById("city-list");
        cityList.textContent ="";

        var searchCities =localStorage.getItem("visitedCities")
            if(searchCities === null){
                searchCities =[];
            }else{
                searchCities =JSON.parse(searchCities);
           }
           searchCities.push(city);
        
           var chosenCities =JSON.stringify(searchCities);
           localStorage.setItem("visitedCities", chosenCities);

           for(let i = 0; i <searchCities.length; i++){
            var list = document.createElement("li");
            list.setAttribute("class", "list-group-item");
            list.setAttribute("id", "city-link");
            list.textContent = searchCities[i];
            cityList.appendChild(list);
        }
    }
}

function currentWeather(city){
    var APIKey = "14bc642e7fbec16847712fb8685896f0";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + 
    city + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
        url:queryURL,
        method: "GET",
    }).then(function (weatherData) {

        var weatherIcon = weatherData.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        var today = dayJS();
        var city = document = getElementById("current-city");
        city.innerHTML = (weatherData.name + " " + "(" + today.format("MM/DD/YYYY") + ")" + '<img src="' + iconurl + '">');


        var temp = document.getElementById("temperature");
        temp.textContent = "Temperature: " +
        weatherData.main.temp + "F"; 
        
        var humidity = document.getElementById("humidity");
        humidity.textContent = "Humidity: " +
        weatherData.main.humidity + "%";

        var windSpeed = document.getElementById("wind-speed");
        windSpeed.textContent = "Wind Speed: " +
        weatherData.main.wind.speed + " MPH";
    
    }
}



listofCitiesButton.on("click", displayWeather);

function deleteHistory(){
    localStorage.clear();
}

//function init(){
   // var citiesStored = JSON.parse(localStorage.getItem("city"));
   // if(citiesStored !==null){
   // }
   // renderCity();
//}
//function NewDay(date){
    //var date = new Date();
    //console.log(date);
    //var month = date.getMonth()+1;
   // var day = date.getDate();
    
   // var dayOutput = date.getFullYear() + '/' +
      //  (month<10 ? '0' : '') + month + '/' +
       // (day<10 ? '0' : '') + day;
   // return dayOutput;
///}
//init();