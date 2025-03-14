const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const body = document.body;

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Dynamic Background Change
        let weatherCondition = data.weather[0].main;
        changeBackground(weatherCondition);
        
        // Animated Weather Icons
        if (weatherCondition == "Clouds") {
            weatherIcon.src = "img/clouds.png";
            weatherIcon.style.transform = "scale(1.1)";
        } else if (weatherCondition == "Clear") {
            weatherIcon.src = "img/clear.png";
            weatherIcon.style.transform = "rotate(10deg)";
        } else if (weatherCondition == "Rain") {
            weatherIcon.src = "img/rain.png";
            weatherIcon.style.transform = "translateY(-10px)";
        } else if (weatherCondition == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
            weatherIcon.style.transform = "scale(1.05)";
        } else if (weatherCondition == "Mist") {
            weatherIcon.src = "img/mist.png";
            weatherIcon.style.transform = "rotate(-10deg)";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Function to change background based on weather
function changeBackground(condition) {
    let bgColor;
    switch (condition) {
        case "Clear":
            bgColor = "linear-gradient(135deg, #ffcc33,rgb(236, 142, 79))";
            break;
        case "Clouds":
            bgColor = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            break;
        case "Rain":
            bgColor = "linear-gradient(135deg, #4b79a1, #283e51)";
            break;
        case "Drizzle":
            bgColor = "linear-gradient(135deg, #4b79a1, #283e51)";
            break;
        case "Mist":
            bgColor = "linear-gradient(135deg, #d3cce3, #e9e4f0)";
            break;
        default:
            bgColor = "linear-gradient(135deg, #00feba, #5b548a)";
    }
    body.style.background = bgColor;
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

checkWeather("Vadodara");  // Default city on load

// Navbar Menu Toggle (Mobile)
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector(".dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".card").classList.toggle("dark-mode");
});

