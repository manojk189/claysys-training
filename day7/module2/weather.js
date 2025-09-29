const apiKey = "10df6420651f411b9ca41203252909";
const searchBtn = document.getElementById("searchBtn");

async function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        displayError("Please enter a city name.");
    }
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found.");
        }

        const data = await response.json();


        document.getElementById("cityName").textContent = data.location.name;
        document.getElementById("temperature").textContent = `${data.current.temp_c} °C`;
        document.getElementById("humidity").textContent = `${data.current.humidity} %`;

        const icon = document.getElementById("icon");
        icon.src = `https:${data.current.condition.icon}`;
        icon.style.display = "inline";

        clearError();

    } catch (error) {
        displayError("Unable to retrieve weather data. " + error.message);
        clearWeatherInfo();
    }
}

function displayError(message) {
    document.getElementById("error").textContent = message;
}

function clearError() {
    document.getElementById("error").textContent = "";
}

function clearWeatherInfo() {
    document.getElementById("cityName").textContent;
    document.getElementById("temperature").textContent;
    document.getElementById("humidity").textContent;
    document.getElementById("icon").style.display;
}
