import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const APIKEY = "e4a43e831ce619939291686ce56ecc5b";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    async function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLocation({ lat, lon });

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    }

    function error(err) {
      alert("Unable to retrieve your location.");
      console.error(err);
    }
  }, []);

  return (
    <>
      <div style={{
        display: "flex",
        gap: "300px"
      }}>
        <div className="weather-card">
          {weatherData ? (
            <>
              <h1 className="city">Enter Your Country Name</h1>
              <input type='text' className='myInput'/>
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
      </div>
    </>
  );
}

export default App;
