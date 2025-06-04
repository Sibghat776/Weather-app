import axios from 'axios';
import React, { useEffect, useState } from 'react';

function WeatherCard({ capital }) {
    const [weatherData, setWeatherData] = useState(null);
    const APIKEY = "e4a43e831ce619939291686ce56ecc5b";

    useEffect(() => {
        const fetchCityWeather = async (cityName) => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`
                );
                setWeatherData(response.data);
            } catch (err) {
                console.error("City weather fetch error:", err);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {
                        const response = await axios.get(
                            `https://api.openweathermap.od rg/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
                        );
                        setWeatherData(response.data);
                    } catch (err) {
                        console.error("Error fetching location weather:", err);
                        fetchCityWeather(capital || "Islamabad");
                    }
                },
                (err) => {
                    console.warn("Geolocation denied or failed:", err);
                    fetchCityWeather(capital || "Islamabad");
                }
            );
        } else {
            console.warn("Geolocation not supported. Falling back to city.");
            fetchCityWeather(capital || "Islamabad");
        }
    }, [capital]);

    return (
        <div className="weather-card">
            {weatherData ? (
                <>
                    <h1 className="city">{weatherData.name}</h1>
                    <h2 className="temp">{Math.round(weatherData.main.temp)}°C</h2>
                    <p className="desc">{weatherData.weather[0].description}</p>
                    <img
                        className="icon"
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />
                    <p className="details">
                        Humidity: {weatherData.main.humidity}%<br />
                        Wind: {weatherData.wind.speed} m/s
                    </p>
                    <p className="date">{new Date().toLocaleDateString()}</p>
                </>
            ) : (
                <p className="loading">Fetching weather data...</p>
            )}
        </div>
    );
}

export default WeatherCard;
