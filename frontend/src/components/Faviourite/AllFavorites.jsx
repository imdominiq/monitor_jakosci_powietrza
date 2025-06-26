import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';

const AllFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${API_URL}/api/favorites/all`);
        if (!res.ok) {
          throw new Error('Błąd pobierania ulubionych lokalizacji');
        }
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFavorites();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (favorites.length === 0) return <p>Brak ulubionych lokalizacji.</p>;

  return (
    <ul>
      {favorites.map(fav => (
        <li key={fav.id}>
          {fav.city} — lat: {fav.lat}, lon: {fav.lon}
        </li>
      ))}
    </ul>
  );
};

export default AllFavorites;
