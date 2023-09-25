
//Later: reduce repetitive code

var today = new Date();
var cityName = $('#cityname').val();


function todaysWeather(whichCity) {

    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${whichCity}&units=imperial&appid=258c3301f61f940efc7c9cffec4f868e`, function(data) {
        var todayData = {
            temp: data.main.temp,
            wind: data.wind.speed,
            humid: data.main.humidity,
            icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        };
        var currentConditionsHTML = `
            <h2 class="date">${today.toDateString()}</h2>
            <p>Temperature: ${todayData.temp}°F <img src="${todayData.icon}" alt="Icon"></p>
            <p>Wind Speed: ${todayData.wind} MPH</p>
            <p>Humidity: ${todayData.humid}</p>
            `
        $('#currentConditions').append(currentConditionsHTML);
    })
}

function weatherForecast(whichCity, when) {
    // Set the dates for the five-day forecast
    var fiveDays = [today];
    var nextDay = new Date();
    nextDay.setDate(today.getDate() + when);
    fiveDays.push(nextDay);
        

    // Set the weather for the five-day forecast
    var listIndex = (when * 8) - 5
    $.get(`https://api.openweathermap.org/data/2.5/forecast?q=${whichCity}&cnt=40&units=imperial&appid=258c3301f61f940efc7c9cffec4f868e`, function(data) {
        var forecastData = {
            temp: data.list[listIndex].main.temp_max,
            wind: data.list[listIndex].wind.speed,
            humid: data.list[listIndex].main.humidity,
            icon: `https://openweathermap.org/img/w/${data.list[listIndex].weather[0].icon}.png`
        };

        var forecastHTML = `
            <article id="day-` + when + `>
                <h2 class="date">${nextDay.toDateString()}</h2>
                <p>Temperature: ${forecastData.temp}°F <img src="${forecastData.icon}" alt="Icon"></p>
                <p>Wind Speed: ${forecastData.wind} MPH</p>
                <p>Humidity: ${forecastData.humid}</p>
            </article>`
        $('#fiveday').append(forecastHTML);
    });
}

function addCity(city) {
    var cityStorage = JSON.parse(localStorage.getItem('city'));
    if (!cityStorage) {
        cityStorage = []
    }

    if (cityStorage.includes(city) == false) {
        cityStorage.push(city);
        localStorage.setItem('city', JSON.stringify(cityStorage));
    }

    displayHistory()
    console.log(city)
}

function displayHistory() {
    var cityHistory = JSON.parse(localStorage.getItem('city'));
    if (!cityHistory) {
        cityHistory = []
    }

    $('#citylist').empty();
    cityHistory.forEach(city => {
        $('#citylist').append(`<button type="button" id=${city}>${city}</button>`)
    })
    
    
}

$('#searchBtn').on('click', function() {
    var chosenCity;
    if (!$('#cityname').val()) {
        chosenCity = 'Washington DC'
    } else {
        chosenCity = $('#cityname').val()
    }
    addCity(chosenCity)
    todaysWeather(chosenCity)
    for (var when = 1; when < 6; when++) {
        weatherForecast(chosenCity, when)
    }
});

$('#citylist').on('click', 'button', function() {
    addCity($(this).text());
    todaysWeather($(this).text())
    for (var when = 1; when < 6; when++) {
        weatherForecast($(this).text(), when)
    }
})

$('#clearhistory').on('click', function() {
    localStorage.clear();
});

displayHistory();