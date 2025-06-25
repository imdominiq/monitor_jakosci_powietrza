import React, { useEffect, useState } from 'react';

import styles from './BasicInfo.module.css';

const BasicInfo = ({ lat = 51.1079, lon = 17.0385 }) => {
  const [data, setData] = useState({ pm25: null, pm10: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/air?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
          throw new Error(`Błąd serwera: ${response.status}`);
        }
        const json = await response.json();
        setData({ pm25: json.pm25, pm10: json.pm10 });
      } catch (err) {
        setError(err.message || "Błąd podczas pobierania danych");
      } finally {
        setLoading(false);
      }
    };

    fetchBasicInfo();
  }, [lat, lon]);

  return (
    <div className={styles.container}>
      <h2>Jakość powietrza</h2>
      {loading ? (
        <p>Ładowanie danych...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <p><strong>PM2.5:</strong> {data.pm25 ?? 'brak danych'} µg/m³</p>
          <p><strong>PM10:</strong> {data.pm10 ?? 'brak danych'} µg/m³</p>
        </>
      )}
    </div>
  );
};

export default BasicInfo;