document.getElementById('fetchWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if(city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

function fetchWeather(city) {
    const apiKey = '0e7c262730bbd2ba0e7adafa132736e6';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    if(data.error) {
        document.getElementById('weatherResult').innerText = "City not found. Please try again.";
    } else {
        const { temperature, weather_descriptions, wind_speed, humidity } = data.current;
        const weatherInfo = `
            <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Description:</strong> ${weather_descriptions.join(', ')}</p>
            <p><strong>Wind Speed:</strong> ${wind_speed} km/h</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
        `;
        document.getElementById('weatherResult').innerHTML = weatherInfo;
    }
}
