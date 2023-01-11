
var today =dayjs();
var currentDay =(today.format("MM/DD/YYYY"));
var city = "";
var listofCities = $("#city-search");
var citiesButton =$("#city-search-button");
//var date = dayJS().format('dddd, MMMM Do YYYY');
//var time = dayJS().format('YYYY-MM-DD');

citiesButton.on("click", displayWeather);

function deleteCities(){
    localStorage.clear();
}


function displayWeather(event){
    event.preventDefault();
    if (listofCities.val().trim() !==""){
        city = listofCities.val().trim();
        currentWeather(city);
        var cityList =document.getElementById("city-list");
        cityList.textContent ="";

        var searchCities =localStorage.getItem("visitedCities");
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
    var apiKey = "14bc642e7fbec16847712fb8685896f0";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + 
    city + "&appid=" + apiKey + "&units=imperial";
    $.ajax({
        url:queryURL,
        method: "GET",
    }).then(function (weatherData) {

        var weatherIcon = weatherData.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        var today = dayjs();
        var city = document.getElementById("current-city");
        city.innerHTML = (weatherData.name + " " + "(" + today.format("MM/DD/YYYY") + ")" + '<img src="' + iconurl + '">');


        var temp = document.getElementById("temperature");
        temp.textContent = "Temperature: " +
        weatherData.main.temp + "F"; 
        
        var humidity = document.getElementById("humidity");
        humidity.textContent = "Humidity: " +
        weatherData.main.humidity + "%";

        var windSpeed = document.getElementById("wind-speed");
        windSpeed.textContent = "Wind Speed: " +
        weatherData.wind.speed + " MPH";


        var latValue = weatherData.coord.lat;
        var lonValue = weatherData.coord.lon;

        $.ajax({
            url:
            "https://api.openweathermap.org/data/2.5/forecast?units=imperial&" + "lat=" + latValue + "&lon=" + 
            lonValue + "&exclude=current,minutely,hourly,alerts" + "&appid=" + apiKey,
            
            method:"GET",
        }).then(function(forecastData){
            $("#forecast").empty();

            for(var i = 1; 1 < 6; i++) {
                var forecastSection =
                document.getElementById("forecast");

                var unix_timestamp = forecastData.daily[i].dt;
                var date = new Date(unix_timestamp *1000);
                var forecastDate= dayjs(date).format('MMM/DD/YYYYM');

                var div1 =document.createElement("div");
                div1.setAttribute("class", "col-sm");
                forecastSection.appendChild(div1);


                var div2 = document.createElement("div");
                div2.setAttribute("class", "card card-body bg primary border-dark");
                div2.appendChild(div2);

                var ptag1 = document.createElement.apply("p");
                ptag1.textContent = forecastDate;
                div2.appendChild(ptag1);

                var img2 = document.createElement('img');
                img2.setAttribute("src",
                "https://openweathermap.ord/img/wn/" + forecastData.daily[i].weather[0].icon  + "@2x.png");
                img2.setAttribute("alt", 
                forecastData.daily[i].weather[0].description);
                div2.appendChild(img2);

                var forcastTemp = forecastData.daily[i].temp.daily;
                var ptag2 = document.createElement("p");
                div2.appendChild(ptag2);
                ptag2.textContent = "Temp" + forcastTemp + "F";

                var forecastHumidity = forecastData.daily[i].humidity;
                var ptag3 = document.createElement("p");
                div2.appendChild(ptag3);
                ptag3.textContent = "humidity" + forecastHumidity + "%";
            
            }
        })
    });
};

