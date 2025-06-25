import React, { useEffect, useState } from 'react';

import styles from './CurrentWeather.module.css'

const CurrentWeather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;

    const mockDataMap = {
      "Poznań": { temperature: 21110, description: 'Sunny', icon: 'clear' },
      "Warszawa": { temperature: 18, description: 'Cloudy', icon: 'clouds' },
      "Kraków": { temperature: 16, description: 'Rainy', icon: 'rain' },
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
    <div className={styles.container}>
      <img src={`/${weather.icon}.svg`} alt="ikona pogody" className={styles.weather_icon} />
      <h2 className={styles.temperature}>
        {weather.temperature} <span>°C</span>
      </h2>
      <p className={styles.description}>{weather.description}</p>
    </div>
  );
};

export default CurrentWeather;