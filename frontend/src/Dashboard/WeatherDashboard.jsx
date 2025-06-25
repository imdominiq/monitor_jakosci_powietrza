import React, { useState, useEffect } from 'react';
import SearchSection from '../components/Search/SearchSection';
import CurrentWeather from '../components/Weather/CurrentWeather';
import AdditionalMetrics from '../components/Metrics/AdditionalMetrics';
import { HourlyWeatherList } from '../components/Weather/HourlyWeatherList';

import styles from './WeatherDashboard.module.css'
import BasicInfo from './BasicInfo';

const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Wrocław');

  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  return (
    <div className={styles.container}>
      
      <div className={styles.city}>
        {selectedCity && <h2><strong>{selectedCity}</strong></h2>}
      </div>

      <BasicInfo />

      <div className={styles.weather_section}>
        <SearchSection />
        <CurrentWeather city={selectedCity} />
        <AdditionalMetrics city={selectedCity} />
        <div className={styles.hourly_forcast}>
          <ul className={styles.weather_list}>
            <HourlyWeatherList city={selectedCity} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;