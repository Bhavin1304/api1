const API_KEY = '54719c606e45875a1638723739efb91b'; // replace this

// DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('search-btn');
const cityNameEl = document.getElementById('city-name');
const dateTimeEl = document.getElementById('date-time');
const tempEl = document.getElementById('temp-value');
const descEl = document.getElementById('weather-desc');
const iconEl = document.getElementById('current-icon');
const feelsEl = document.getElementById('feels-like');
const humidEl = document.getElementById('humidity');
const windEl = document.getElementById('wind-speed');
const forecastContainer = document.getElementById('forecast');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  try {
    // Current weather
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    if (data.cod !== 200) throw new Error(data.message);
    updateCurrentWeather(data);

    // Forecast (5-day / 3-hour)
    const resF = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const dataF = await resF.json();
    updateForecast(dataF.list);
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

function updateCurrentWeather(data) {
  cityNameEl.textContent = data.name;
  const now = new Date();
  dateTimeEl.textContent = now.toLocaleString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  descEl.textContent = data.weather[0].description;
  iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`;
  feelsEl.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
  humidEl.textContent = `Humidity: ${data.main.humidity}%`;
  windEl.textContent = `Wind: ${Math.round(data.wind.speed * 3.6)} km/h`;
}

function updateForecast(list) {
  forecastContainer.innerHTML = '';
  // Select one forecast per day at noon
  const daily = list.filter(item => item.dt_txt.includes('12:00:00'));
  daily.slice(0, 5).forEach(item => {
    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const icon = `<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">`;
    const max = Math.round(item.main.temp_max);
    const min = Math.round(item.main.temp_min);
    const desc = item.weather[0].description;
    forecastContainer.innerHTML += `
      <div class="day">
        <p>${day}</p>
        <div class="icon">${icon}</div>
        <p>${max}° - ${min}°</p>
        <p>${desc}</p>
      </div>`;
  });
}
