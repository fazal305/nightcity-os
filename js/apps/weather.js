/* 
   Builds the weather app inside a window content area
*/
function renderWeatherApp(contentElement) {
    contentElement.innerHTML = `
        <div class="weather-app">
            <section class="weather-card">
                <p class="weather-label">Karachi Weather Link</p>
                <h3 id="weather-temp">Loading...</h3>
                <p id="weather-condition">Fetching live weather data...</p>
            </section>

            <section class="weather-grid">
                <div class="weather-stat">
                    <span>Humidity</span>
                    <strong id="weather-humidity">--</strong>
                </div>

                <div class="weather-stat">
                    <span>Wind</span>
                    <strong id="weather-wind">--</strong>
                </div>

                <div class="weather-stat">
                    <span>Sunrise</span>
                    <strong id="weather-sunrise">--</strong>
                </div>

                <div class="weather-stat">
                    <span>Sunset</span>
                    <strong id="weather-sunset">--</strong>
                </div>
            </section>

            <button class="weather-refresh-btn" id="weather-refresh-btn" type="button">
                Refresh Weather
            </button>
        </div>
    `;

    setupWeatherApp();
}

/* 
   Connects weather refresh button and loads weather data
*/
function setupWeatherApp() {
    const refreshButton = document.querySelector("#weather-refresh-btn");

    if (refreshButton) {
        refreshButton.addEventListener("click", fetchKarachiWeather);
    }

    fetchKarachiWeather();
}

/* 
   Fetches live Karachi weather from Open-Meteo
*/
async function fetchKarachiWeather() {
    const temperatureText = document.querySelector("#weather-temp");
    const conditionText = document.querySelector("#weather-condition");
    const humidityText = document.querySelector("#weather-humidity");
    const windText = document.querySelector("#weather-wind");
    const sunriseText = document.querySelector("#weather-sunrise");
    const sunsetText = document.querySelector("#weather-sunset");

    try {
        temperatureText.textContent = "Loading...";
        conditionText.textContent = "Contacting weather satellite...";

        const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=24.8607&longitude=67.0011&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=sunrise,sunset&timezone=Asia%2FKarachi";

        const response = await fetch(weatherUrl);
        const data = await response.json();

        const currentWeather = data.current;
        const dailyWeather = data.daily;

        temperatureText.textContent = `${Math.round(currentWeather.temperature_2m)}°C`;
        conditionText.textContent = getWeatherCondition(currentWeather.weather_code);
        humidityText.textContent = `${currentWeather.relative_humidity_2m}%`;
        windText.textContent = `${currentWeather.wind_speed_10m} km/h`;
        sunriseText.textContent = formatWeatherTime(dailyWeather.sunrise[0]);
        sunsetText.textContent = formatWeatherTime(dailyWeather.sunset[0]);
    } catch (error) {
        temperatureText.textContent = "ERROR";
        conditionText.textContent = "Weather signal lost. Check internet connection.";
        humidityText.textContent = "--";
        windText.textContent = "--";
        sunriseText.textContent = "--";
        sunsetText.textContent = "--";
    }
}

/* 
   Converts Open-Meteo weather codes into readable text
*/
function getWeatherCondition(code) {
    if (code === 0) {
        return "Clear sky";
    }

    if (code >= 1 && code <= 3) {
        return "Partly cloudy";
    }

    if (code >= 45 && code <= 48) {
        return "Foggy";
    }

    if (code >= 51 && code <= 67) {
        return "Drizzle";
    }

    if (code >= 71 && code <= 77) {
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        return "Rain showers";
    }

    if (code >= 95) {
        return "Thunderstorm";
    }

    return "Unknown weather";
}

/* 
   Formats API time into readable local time
*/
function formatWeatherTime(timeValue) {
    const date = new Date(timeValue);

    return date.toLocaleTimeString("en-PK", {
        hour: "2-digit",
        minute: "2-digit"
    });
}