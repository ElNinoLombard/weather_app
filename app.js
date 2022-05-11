/* ELEMENTS */
const statusElement = document.querySelector('.access-statuts');
const iconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature p');
const tempdescElement = document.querySelector('.temp-description p');
const locationElement = document.querySelector('.location p');

/* DATA */
const weather = {};

weather.temperature = {
    unit : "celsius"
}
/* CONSTS AND VARS */
const kelvinTemp = 273;
/* API KEY */
const apiKey = "a099ae58306297cbe47964251b9d9f83";

/* BROWSER ALLOWS GEOLOCATION? */
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    alertElement.style.display = "block"; /* so we make the alert visible */
    alertElement.innerHTML = "<p> This browser does not support geolocation</p>";
}

/* USER'S GEOLOCATION */
const setPosition = position => {
    let lat = position.coords.lat;
    let lon = position.coords.lon;

    getWeather(lat, lon);
}

/* ERROR MESSAGE IF GEOLOCATION IS NOT ALLOWED */
const showError = error => {
    statusElement.style.display = "block";
    statusElement.innerHTML = `<p>${error.message}</p>`;
}

/* GET WEATHER */
const getWeather = (lat, lon) => {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(api).then(function(reponse){
        let data = response.json();
        return data;
    })
}

/* FUNCTION TO DISPLAY THE WEATHER DEPENDING ON THE AREA */
const displayWeather = () => {  
    iconElement.innerHTML = `<img src="icons/ ${weather.iconId}.png"/>`;
    temperatureElement.innerHTML = `${weather.temperature.value} ᵒ <span>C</span>`;
    tempdescElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

/* FUNCTION TO CONVERT T CELSIUS TO FAHRENHEIT */
const celciusToFahrenheit = temperature => { 
    return(temperature * 9/5) + 32;
}

/* FUNCTION TO CHANGE UNIT ON CLICK */
temperatureElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celcius"){
        let fahrenheit = celciusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        temperatureElement.innerHTML = `${fahrenheit}ᵒ <span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        temperatureElement.innerHTML = `${weather.temperature.value}ᵒ <span>C</span>`;
        weather.temperature.unit = "celcius";
    }
})