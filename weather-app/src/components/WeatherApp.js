import React, { useState, useEffect } from 'react';

// WeatherApp Component
function WeatherApp() {
  // States to manage the weather data, location, and error messages
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Paris');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // OpenWeatherMap API Key
  const apiKey = '5a341f6953d0b003c52ea210084e55e7';

  // API URL with dynamic location and metric units
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  // Fetch weather data whenever location changes
  useEffect(() => {
    setLoading(true);
    setError('');
    
    // Fetch data from OpenWeatherMap API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          setWeatherData(data); // Set weather data if API responds correctly
        } else {
          setError(data.message); // Show error message from API response
        }
        setLoading(false); // Stop loading spinner
      })
      .catch(err => {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      });
  }, [location]); // Re-fetch data when the location state changes

  // Update location based on user input
  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form submission
    setLocation(event.target.location.value); // Update location with the input value
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      
      {/* Search form to update location */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="location"
          placeholder="Enter city name"
          defaultValue={location}
          required
        />
        <button type="submit">Search</button>
      </form>
      
      {/* Show loading spinner while fetching data */}
      {loading && <div>Loading...</div>}

      {/* Show error message if there's an error */}
      {error && <div>Error: {error}</div>}

      {/* Show weather data if available */}
      {weatherData && !loading && !error && (
        <div className="weather-info">
          <h2>Weather in {weatherData.name}, {weatherData.sys.country}</h2>
          <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
          <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Min Temp:</strong> {weatherData.main.temp_min}°C</p>
          <p><strong>Max Temp:</strong> {weatherData.main.temp_max}°C</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>Wind Direction:</strong> {weatherData.wind.deg}°</p>
          <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
