import React, { useState } from 'react'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-blue-400 to-indigo-500  flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-4xl font-bold mb-6">🌤 Weather App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="px-4 py-2 rounded-lg text-black"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition"
          onClick={fetchWeather}
        >
          Search
        </button>
      </div>

      {/* Show weather data if available */}
      {weather && weather.main && (
        <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center shadow-lg">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p className="text-xl">{weather.main.temp} °C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="mx-auto mt-2"
          />
        </div>
      )}
    </div>
  );
}

export default App;
