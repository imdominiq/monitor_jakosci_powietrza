import React from 'react';

export const HourlyWeatherItem = ({ time, icon, temperature }) => {
  return (
    <li className="weather-item">
      <p className="time">{time}</p>
      <img src={`/${icon}.svg`} alt="ikona pogody" className="weather-icon" />
      <p className="temperature">{temperature}°</p>
    </li>
  );
};
