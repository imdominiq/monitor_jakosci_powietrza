import React, { useEffect, useState } from 'react';
import styles from './FavoritesList.module.css';

const FavoritesList = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editCity, setEditCity] = useState('');

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/favorites/all`);
        if (!response.ok) throw new Error(`Błąd serwera: ${response.status}`);
        const data = await response.json();
        console.log(data)
        setFavorites(data);
      } catch (err) {
        setError(err.message || 'Błąd podczas pobierania ulubionych');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Na pewno chcesz usunąć tę lokalizację?')) return;
    try {
      const response = await fetch(`http://localhost:3001/api/favorites/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Błąd serwera: ${response.status}`);

      setFavorites((prev) => prev.filter(fav => fav.id !== id));
    } catch (err) {
      alert(err.message || 'Błąd podczas usuwania');
    }
  };

  const startEdit = (id, city) => {
    setEditId(id);
    setEditCity(city);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditCity('');
  };

  const saveEdit = async (id) => {
    if (!editCity.trim()) {
      alert('Nazwa miasta nie może być pusta');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/api/favorites/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: editCity }),
      });
      if (!response.ok) throw new Error(`Błąd serwera: ${response.status}`);

      const updated = await response.json();

      setFavorites((prev) =>
        prev.map((fav) => (fav.id === id ? updated : fav))
      );

      cancelEdit();
    } catch (err) {
      alert(err.message || 'Błąd podczas aktualizacji');
    }
  };

  if (loading) return <p className={styles.loading}>Ładowanie ulubionych...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (favorites.length === 0) return <p className={styles.empty}>Brak ulubionych lokalizacji.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Twoje ulubione lokalizacje</h2>
      <ul className={styles.list}>
        {favorites.map(({ id, city, pm25, pm10, created_at }) => (
          <li key={id} className={styles.item}>
            <div className={styles.header}>
              {editId === id ? (
                <>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className={styles.editInput}
                  />
                  <button
                    className={styles.actionBtn}
                    onClick={() => saveEdit(id)}
                    title="Zapisz"
                  >
                    💾
                  </button>
                  <button
                    className={styles.actionBtn}
                    onClick={cancelEdit}
                    title="Anuluj"
                  >
                    ❌
                  </button>
                </>
              ) : (
                <>
                  <strong className={styles.city}>{city}</strong>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionBtn}
                      title="Edytuj"
                      onClick={() => startEdit(id, city)}
                    >
                      ✏️
                    </button>
                    <button
                      className={styles.actionBtn}
                      title="Usuń"
                      onClick={() => handleDelete(id)}
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className={styles.values}>
              <span>PM2.5: {pm25 !== null ? `${pm25} µg/m³` : 'brak danych'}</span>
              <span>PM10: {pm10 !== null ? `${pm10} µg/m³` : 'brak danych'}</span>
              <span>Pomiar: {created_at ? new Date(created_at).toLocaleString() : 'brak daty'}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
