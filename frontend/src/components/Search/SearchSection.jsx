import React, { useState, useEffect } from 'react';

import styles from './SearchSection.module.css'

const defaultCities = [
  "Poznań",
  "Warszawa",
  "Płońsk",
  "Kraków",
  "Przemyśl",
  "Pruszków",
  "Piła",
  "Polkowice"
];

const SearchSection = ({onCitySelect}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
  if (query.length === 0) {
    setSuggestions([]);
    return;
  }

  // 👉 Poniżej jest wersja na backend (odkomentuj i dostosuj URL):
  /*
  fetch(`/api/cities?query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      // zakładam, że backend zwraca tablicę nazw miast
      setSuggestions(data);
    })
    .catch(err => {
      console.error('Błąd pobierania miast:', err);
      setSuggestions([]);
    });
  */

  // ❌ Na razie lokalne filtrowanie na podstawie defaultCities:
  const filtered = defaultCities.filter(city =>
    city.toLowerCase().startsWith(query.toLowerCase())
  );
  setSuggestions(filtered);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectSuggestion = (city) => {
    setQuery(city);
    setSuggestions([]);
    onCitySelect(city);
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    console.log('Szukane miasto:', query);
    // Tutaj po podłączeniu backendu wywołaj API pogodowe
  };

  return (
    <div className={styles.search_section} style={{ position: 'relative' }}>
      <form className={styles.search_form} onSubmit={handleCitySearch}>
        <span className={styles.material_symbols_rounded}>search</span>
        <input
          type="search"
          placeholder="Enter a city name"
          className={styles.search_input}
          value={query}
          onChange={handleInputChange}
          required
          autoComplete="off"
        />
      </form>
      {suggestions.length > 0 && (
        <ul className={styles.suggestions_list}>
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(city)}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
              onMouseDown={e => e.preventDefault()}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
      <button className={styles.location_button} type="button">
        <span className={styles.material_symbols_rounded}>Lokalizacja</span>
      </button>
    </div>
  );
};

export default SearchSection;