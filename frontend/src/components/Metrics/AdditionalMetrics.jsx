import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import styles from './AdditionalMetrics.module.css'

const AdditionalMetrics = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    o3: "45 µg/m³",
    pm10: "60 µg/m³",
    no2: "25 µg/m³",
    pm25: "34 µg/m³",
    co2: "420 ppm",
  });


  useEffect(() => {
    // ✅ MOCK DATA (until backend is ready)
    const mockMetrics = {
      o3: "45 µg/m³",
      pm10: "60 µg/m³",
      no2: "25 µg/m³",
      pm25: "34 µg/m³",
      co2: "420 ppm",
    };
    setMetrics(mockMetrics);

    // 🔗 BACKEND – enable when your endpoint is ready:
    /*
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((data) => {
        setMetrics({
          o3: data.o3,
          pm10: data.pm10,
          no2: data.no2,
          pm25: data.pm25,
          co2: data.co2,
        });
      })
      .catch((err) => console.error("Error fetching metrics:", err));
    */
  }, []);

  const handleClick = () => {
    navigate('/metrics');  // navigate to detailed metrics page
  };

  return (
    <div className={styles.additional_metrics} onClick={handleClick}>
      <div className={styles.metric}>
        <h3>O₃</h3>
        <p>{metrics.o3}</p>
      </div>
      <div className={styles.metric}>
        <h3>PM10</h3>
        <p>{metrics.pm10}</p>
      </div>
      <div className={styles.metric}>
        <h3>NO₂</h3>
        <p>{metrics.no2}</p>
      </div>
      <div className={styles.metric}>
        <h3>PM2.5</h3>
        <p>{metrics.pm25}</p>
      </div>
      <div className={styles.metric}>
        <h3>CO₂</h3>
        <p>{metrics.co2}</p>
      </div>
    </div>
  );
};

export default AdditionalMetrics;