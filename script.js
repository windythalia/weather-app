const cityInput = document.querySelector('.input-city');
const searchBtn = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.search-message');
const weatherInfoSection = document.querySelector('.location-info');

const countryTxt = document.querySelector('.country');
const tempTxt = document.querySelector('.temp');
const conditionTxt = document.querySelector('.ket-temp');
const humidityValueTxt = document.getElementById('humidity');
const windValueTxt = document.getElementById('wind-value');
const feelLikeTxt = document.getElementById('feels-like');
const visibilityTxt = document.getElementById('visibility');
const weatherSummaryImg = document.querySelector('.weather-icon');

const apiKey = 'ea2dbb77f4e0a253c01c7ab37e945eb1';

searchBtn.addEventListener('click', () =>{
    if(cityInput.value.trim() != '');
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
})

cityInput.addEventListener('keydown', (event) =>{
    if(event.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch (apiUrl);

    return response.json()
}

function getWeatherIcon(id) {
    if(id <= 232) return 'thunderstorm.png';
    if(id <= 321) return 'drizzle.png';
    if(id <= 531) return 'rain.png';
    if(id <= 622) return 'snow.png';
    if(id <= 781) return 'atmosphere.png';
    if(id <= 800) return 'clear.png';
    else return 'clouds.png';
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    if(weatherData.cod != 200){
        showDisplaySection(notFoundSection);
        return;
    }
    console.log(weatherData);

    const {
        name: country,
        main: {feels_like, temp, humidity},
        weather: [{id, main}],
        wind: {speed},
        visibility
    } = weatherData

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + '°C';
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = Math.round(speed) + ' M/s';
    feelLikeTxt.textContent = Math.round(feels_like) + '°C';
    visibilityTxt.textContent = visibility/1000 + ' km';

    weatherSummaryImg.src = `img/${getWeatherIcon(id)}`;

    showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section){
    [weatherInfoSection, notFoundSection]
        .forEach(section => section.style.display = 'none');

    section.style.display = 'flex'
}
