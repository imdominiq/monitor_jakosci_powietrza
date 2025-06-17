import React, { useState, useEffect } from 'react';

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
  const [showSuggestions, setShowSuggestions] = useState(false); 

  useEffect(() => {
  if (query.trim() === '') {
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
  setShowSuggestions(true);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

   const handleSelectSuggestion = (city) => {
    setQuery(city);                 
    setSuggestions([]);   
    setShowSuggestions(false);           // ✅ natychmiast ukrywa listę
    onCitySelect(city);             
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    console.log('Szukane miasto:', query);
    // Tutaj po podłączeniu backendu wywołaj API pogodowe
  };

  const handleBlur = () => {
    // Dodaj timeout żeby klik zdążył się zarejestrować
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className="search-section" style={{ position: 'relative' }}>
      <form className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-rounded">search</span>
        <input
          type="search"
          placeholder="Enter a city name"
          className="search-input"
          value={query}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          autoComplete="off"
        />
      </form>
      {showSuggestions && suggestions.length > 0 &&(
        <ul className='suggestions-list'>
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(city)}
              style={{ padding: '8px 12px', cursor: 'pointer' }} 
            >
              {city}
            </li>
          ))}
        </ul>
      )}
      <button className="location-button" type="button">
        <span className="material-symbols-rounded">my_location</span>
      </button>
    </div>
  );
};

export default SearchSection;