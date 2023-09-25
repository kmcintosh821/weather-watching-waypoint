
//Later: reduce repetitive code

var today = new Date();

document.getElementById('todays-date').innerHTML = today.toDateString();

fiveDays = [today];

for (whichDay = 0; whichDay < 5; whichDay++) {
    var nextDay = new Date();
    nextDay.setDate(today.getDate() + whichDay + 1);
    fiveDays.push(nextDay);
    document.getElementById('day-' + (whichDay + 1)).querySelector('h2').innerHTML = nextDay.toDateString();
}

var cityName = $('#cityname').val();

function getWeather(whichCity, when) {
    if (when > 0) {
        var listIndex = (when * 8) - 5
        $.get('https://api.openweathermap.org/data/2.5/forecast?q=${whichCity}&cnt=40&units=imperial&appid=258c3301f61f940efc7c9cffec4f868e', function(data) {
            var forecastData = {
                temp: data.list[listIndex].main.temp_max,
                wind: data.list[listIndex].wind.speed,
                humid: data.list[listIndex].main.humidity,
                icon: `https://openweathermap.org/img/w/${data.list[listIndex].weather[0].icon}.png`
            }
        })
    } else {
        $.get('https://api.openweathermap.org/data/2.5/weather?q=${whichCity}&units=imperial&appid=258c3301f61f940efc7c9cffec4f868e', function(data) {
            var todayData = {
                temp: data.main.temp,
                wind: data.wind.speed,
                humid: data.main.humidity,
                icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
            };
        })
        
    }
}

function addCity(city) {
    var cityStorage = JSON.parse(localStorage.getItem('city'));
    if (!cityStorage) {
        cityStorage = ['Washington, DC']
    }

    if (cityStorage.includes(city) == false) {
        cityStorage.push(city);
        localStorage.setItem('city', JSON.stringify(cityStorage));
        var cityHistory = document.createElement('input')
        var cityLabel = document.createElement('label')
        cityHistory.type = 'radio';
        cityHistory.id = city;
        cityHistory.value = city;
        cityHistory.name = 'city-history';
        cityLabel.for = city;
        cityLabel.innerHTML = city;
        document.getElementById('endofcitylist').before(cityLabel);
        cityLabel.before(cityHistory);
    }

}