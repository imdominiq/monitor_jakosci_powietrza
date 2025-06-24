import React, { useState, useEffect } from 'react';
import SearchSection from './components/SearchSection';
import CurrentWeather from './components/CurrentWeather';
import AdditionalMetrics from './components/AdditionalMetrics';
import { HourlyWeatherList } from './components/HourlyWeatherList';

const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Wrocław');

  // Sprawdź, czy użytkownik wcześniej wybrał miasto
  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  // Funkcja do zmiany miasta i zapisu w localStorage
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    localStorage.setItem('lastCity', city);
  };

  return (
    <div className="container">
      
      {/* Nazwa wybranego miasta – widoczna pod searchbarem */}
      <div style={{ textAlign: 'center', marginTop: '10px', color: '#fff', fontSize: '1.2rem' }}>
        {selectedCity && <h2><strong>{selectedCity}</strong></h2>}
      </div>

      <div className="weather-section">
        <CurrentWeather city={selectedCity} />
        <AdditionalMetrics city={selectedCity} />
        <div className="hourly-forcast">
          <ul className="weather-list">
            <HourlyWeatherList city={selectedCity} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;