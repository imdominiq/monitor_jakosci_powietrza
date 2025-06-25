import React, { useEffect, useState } from 'react';
import styles from './FavoritesList.module.css'; // import modułu CSS

const FavoritesList = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        /*
        const response = await fetch(`http://localhost:3001/favorites?user_id=${userId}`);
        if (!response.ok) throw new Error(`Błąd serwera: ${response.status}`);
        const data = await response.json();
        setFavorites(data);
        */

        const mockData = [
          { id: 1, city: 'Warszawa', pm25: 12.3, pm10: 25.7 },
          { id: 2, city: 'Kraków', pm25: 18.9, pm10: 40.1 },
          { id: 3, city: 'Poznań', pm25: null, pm10: null },
        ];
        setFavorites(mockData);

      } catch (err) {
        setError(err.message || 'Błąd podczas pobierania ulubionych');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  if (loading) return <p className={styles.loading}>Ładowanie ulubionych...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (favorites.length === 0) return <p className={styles.empty}>Brak ulubionych lokalizacji.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Twoje ulubione lokalizacje</h2>
      <ul className={styles.list}>
        {favorites.map(({ id, city, pm25, pm10 }) => (
          <li key={id} className={styles.item}>
            <div className={styles.header}>
              <strong className={styles.city}>{city}</strong>
              <div className={styles.actions}>
                <button
                  className={styles.actionBtn}
                  title="Edytuj"
                  onClick={() => alert(`Edytuj miasto: ${city}`)}
                >
                  ✏️
                </button>
                <button
                  className={styles.actionBtn}
                  title="Usuń"
                  onClick={() => alert(`Usuń miasto: ${city}`)}
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className={styles.values}>
              <span>PM2.5: {pm25 !== null ? `${pm25} µg/m³` : 'brak danych'}</span>
              <span>PM10: {pm10 !== null ? `${pm10} µg/m³` : 'brak danych'}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
