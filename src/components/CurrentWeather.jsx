import React, { useEffect, useState } from 'react';

const CurrentWeather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return; // nie ładuj, gdy brak miasta

    // 🧪 Dane testowe na start:
    const mockDataMap = {
      "Poznań": { temperature: 20, description: 'Sunny', icon: 'clear' },
      "Warszawa": { temperature: 18, description: 'Cloudy', icon: 'clouds' },
      "Kraków": { temperature: 16, description: 'Rainy', icon: 'rain' },
      // ... inne miasta i mocki
    };

    if (mockDataMap[city]) {
      setWeather(mockDataMap[city]);
    } else {
      setWeather({
        temperature: 22,
        description: 'Sunny',
        icon: 'clear'
      });
    }

    // 🔧 Backend (odkomentuj i dostosuj endpoint po połączeniu z API):
    /*
    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => {
        console.error('Błąd API:', err);
        setWeather(null);
      });
    */
  }, [city]);

  if (!weather) return <p>Ładowanie danych pogodowych...</p>;

  return (
    <div className="current-weather">
      <img src={`/${weather.icon}.svg`} alt="ikona pogody" className="weather-icon" />
      <h2 className="temperature">
        {weather.temperature} <span>°C</span>
      </h2>
      <p className="description">{weather.description}</p>
    </div>
  );
};

export default CurrentWeather;