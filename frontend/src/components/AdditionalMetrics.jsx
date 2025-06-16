import React, { useEffect, useState } from "react";

const AdditionalMetrics = () => {
  const [metrics, setMetrics] = useState({
    wind: "15 km/h",
    pm25: "34 µg/m³",
    co2: "420 ppm",
  });

  useEffect(() => {
    // ✅ TESTOWE DANE - działają bez backendu
    const mockMetrics = {
      wind: "15 km/h",
      pm25: "34 µg/m³",
      co2: "420 ppm",
    };
    setMetrics(mockMetrics);

    // ✅ BACKEND – odkomentuj, gdy endpoint będzie gotowy:
    /*
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((data) => {
        setMetrics({
          wind: data.wind,
          pm25: data.pm25,
          co2: data.co2,
        });
      })
      .catch((err) => console.error("Błąd pobierania danych:", err));
    */
  }, []);

  return (
    <div className="additional-metrics">
      <div className="metric">
        <h3>Wind</h3>
        <p>{metrics.wind}</p>
      </div>
      <div className="metric">
        <h3>PM2.5</h3>
        <p>{metrics.pm25}</p>
      </div>
      <div className="metric">
        <h3>CO₂</h3>
        <p>{metrics.co2}</p>
      </div>
    </div>
  );
};

export default AdditionalMetrics;