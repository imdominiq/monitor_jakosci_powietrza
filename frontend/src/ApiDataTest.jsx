import React, { useEffect, useState } from 'react';

function AirQuality() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lat = 52.4069;
    const lon = 16.9299;

    fetch(`http://localhost:3001/api/air?lat=${lat}&lon=${lon}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania danych z backendu');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  if (!data) {
    return <div>Ładowanie danych jakości powietrza...</div>;
  }

  // Załóżmy, że dane z API mają strukturę:
  // data.hourly.pm10 i data.hourly.pm2_5 jako tablice wartości godzinowych

  return (
    <div>
      <h2>Jakość powietrza w Poznaniu</h2>
      <p>PM10 (godzinowe): {data.hourly.pm10[0]}</p>
      <p>PM2.5 (godzinowe): {data.hourly.pm2_5[0]}</p>
      {/* Możesz rozwinąć wyświetlanie np. mapę godzin, wykres itd. */}
    </div>
  );
}

export default AirQuality;
