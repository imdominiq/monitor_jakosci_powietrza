import styles from './HourlyWeatherItem.module.css'

export const HourlyWeatherItem = ({ time, icon, temperature }) => {
  return (
    <li className={styles.weather_item}>
      <p className={styles.time}>{time}</p>
      <img src={`/${icon}.svg`} alt="ikona pogody" className={styles.weather_icon} />
      <p className={styles.temperature}>{temperature}°</p>
    </li>
  );
};
