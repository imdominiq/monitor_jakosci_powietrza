import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../config';
import styles from './AddFavoriteForm.module.css';

const AddFavoriteForm = ({ onSuccess }) => {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      setLoadingSuggestions(true);
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=044d8a50e692433ea93a4011c40b0adc&limit=5`,
          { signal: controller.signal }
        );
        const result = await response.json();

        if (result.results) {
          setSuggestions(
            result.results.map((item) => ({
              city: item.formatted,
              lat: item.geometry.lat,
              lon: item.geometry.lng,
            }))
          );
          setShowSuggestions(true);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setMessage('Błąd pobierania podpowiedzi');
        }
      } finally {
        setLoadingSuggestions(false);
      }
    };

    // Debounce 300ms
    const debounceId = setTimeout(fetchSuggestions, 300);

    return () => {
      clearTimeout(debounceId);
      controller.abort();
    };
  }, [city]);

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.city);
    setLat(suggestion.lat.toFixed(6));
    setLon(suggestion.lon.toFixed(6));
    setShowSuggestions(false);
    setSuggestions([]);
  };

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
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <h3 className={styles.heading}>Dodaj lokalizację do ulubionych</h3>

      <div style={{ position: 'relative' }}>
        <input
          className={styles.input}
          type="text"
          placeholder="Miasto"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
          ref={inputRef}
          required
        />
        {loadingSuggestions && <div className={styles.suggestionsLoading}>Ładowanie...</div>}
        {showSuggestions && suggestions.length > 0 && (
          <ul className={styles.suggestionsList}>
            {suggestions.map((sugg, idx) => (
              <li
                key={idx}
                className={styles.suggestionItem}
                onClick={() => handleSuggestionClick(sugg)}
              >
                {sugg.city}
              </li>
            ))}
          </ul>
        )}
      </div>

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
