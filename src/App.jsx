import React, { useState } from "react";
import rain from './assets/rain.gif';
import mist from './assets/mist.gif';
import clouds from './assets/fewClouds.gif';
import clear from './assets/clear.gif';
import thunder from './assets/thunder.gif';
import snow from './assets/snow.gif';
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  const getBackgroundImage = () => {
    if (!weatherData || !weatherData.weather) return clear; // Default background

    switch (weatherData.weather[0].main.toLowerCase()) {
      case 'rain':
        return rain;
      case 'clouds':
        return clouds;
      case 'mist':
        return mist;
      case 'snow':
        return snow;
      case 'thunder':
        return thunder;
      default:
        return clear;
    }
  };

  return (
    <div
      className="container text-center"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <h1 className="mt-5">Weather App</h1>
      <div className="card mx-auto mt-4 p-3" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchWeather}>
          Get Weather
        </button>

        {error && <p className="text-danger mt-3">{error}</p>}

        {weatherData && (
          <div className="mt-4">
            <h3>{weatherData.name}</h3>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Condition: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
