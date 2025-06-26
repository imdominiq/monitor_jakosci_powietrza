import React, { useState } from 'react';
import { API_URL } from '../../config';
import styles from './AddFavoriteForm.module.css';

const AddFavoriteForm = ({ onSuccess }) => {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('supabase_token');

      const payload = {
        user_id: 'c8c6f93d-e30a-4f85-a28d-2c0f0e949fe9',
        city,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      };

      const res = await fetch(`${API_URL}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        let errorMessage = 'Nie udało się dodać lokalizacji';
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.error || errorMessage;
        } catch {
          if (text) errorMessage = text;
        }
        throw new Error(errorMessage);
      }

      setMessage('✅ Lokalizacja dodana do ulubionych!');
      setCity('');
      setLat('');
      setLon('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage(err.message || 'Błąd');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.heading}>Dodaj lokalizację do ulubionych</h3>

      <input
        className={styles.input}
        type="text"
        placeholder="Miasto"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Szerokość geograficzna (lat)"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Długość geograficzna (lon)"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        required
      />

      <button className={styles.button} type="submit">Dodaj</button>

      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default AddFavoriteForm;
