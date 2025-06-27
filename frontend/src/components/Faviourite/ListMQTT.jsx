import React, { useEffect, useState } from 'react';

function ListMQTT() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/favorites')
      .then(res => res.json())
      .then(data => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (favorites.length === 0) return <p>Brak ulubionych lokalizacji.</p>;

  return (
    <ul>
      {favorites.map(({ id, city, lat, lon }) => (
        <li key={id}>
          {city} (lat: {lat}, lon: {lon})
        </li>
      ))}
    </ul>
  );
}

export default ListMQTT;
