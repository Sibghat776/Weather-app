import axios from 'axios';
import React, { useEffect, useState } from 'react';

function WeatherCard({ capital }) {
    const [weatherData, setWeatherData] = useState(null);
    const [cityWeatherData, setCityWeatherData] = useState(null);
    const [capitalData, setCapitalData] = useState(null);
    const [userCityName, setUserCityName] = useState("");
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
                            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
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

    async function cityData() {
        if (!userCityName) return;
        try {
            let res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${userCityName}&appid=${APIKEY}&units=metric`
            );
            let resJSON = await res.json();
            if (resJSON.cod === 200) {
                setCityWeatherData(resJSON);
            } else {
                alert("City not found");
            }
        } catch (err) {
            console.error("Error fetching city weather:", err);
        }
        setUserCityName("");
    }

    const displayData = cityWeatherData || weatherData;

    return (
        <div className="weather-card">
            <div className="input-section">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        cityData();
                    }}
                    style={{ display: "flex", marginBottom: "10px" }}
                >
                    <input
                        type="text"
                        placeholder="Enter city name..."
                        value={userCityName}
                        onChange={(e) => setUserCityName(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>

            {displayData && (
                <>
                    <h1 className="city">{displayData.name}</h1>
                    <h2 className="temp">{Math.round(displayData.main.temp)}°C</h2>
                    <p className="desc">{displayData.weather[0].description}</p>
                    <img
                        className="icon"
                        src={`http://openweathermap.org/img/wn/${displayData.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />
                    <p className="details">
                        Humidity: {displayData.main.humidity}%<br />
                        Wind: {displayData.wind.speed} m/s
                    </p>
                    <p className="date">{new Date().toLocaleDateString()}</p>
                </>
            )}
        </div>
    );
}

export default WeatherCard;
