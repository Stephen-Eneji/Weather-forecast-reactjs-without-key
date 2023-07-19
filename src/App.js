import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling


const App = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [apiKey, setApiKey] = useState('');

  const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchLocation}`;

  // Getting the data from API with the Weather URL
  const handleSearch = async () => {
    try {
      const response = await axios.get(weatherApiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

// Returning that data real-time (so tired)
  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <div className="api-key-input">
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
        />
      </div>


      <div className="search-container">
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>


      {weatherData && (
        <div className="weather-details">
          <h2>Current Weather in {weatherData.location.name}</h2>
          <div className="weather-info">
            <div className="weather-condition">
              <img src={weatherData.current.condition.icon} alt="Weather Icon" />
              <p>{weatherData.current.condition.text}</p>
            </div>
            <div className="temperature">
              <p>{weatherData.current.temp_c}°C</p>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default App;
