//Select the form and input elements
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');

//OpenWeatherMap API
const apiKey = '59a3f294521af46edec388a864e31eec';

//Event listener for form submission
weatherForm.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent the form from submitting the traditional way

    const city = cityInput.value.trim(); //Trim any spaces

    if (!city) {
        weatherResult.innerHTML = `<p>Please enter a city name</p>`;
        return;
    }

    //Call the openWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        if (data.cod === '404'){
            weatherResult.innerHTML = `<p>City not found. Please try again</p>`;
        } else {
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            //Display the weather information
            weatherResult.innerHTML = `
            <h3>Weather in ${data.name}</h3>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${weatherDescription}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherResult.innerHTML = `<P>Unable to fetch weather data. Please try again</p>`;
    });
});