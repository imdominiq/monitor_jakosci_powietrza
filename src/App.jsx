import React, { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import WeatherDashboard from './WeatherDashboard';

const App = () => {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null); // odkomentuj przy backendzie
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Domyślnie używamy localStorage (mock)
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(savedUser);

    // --- backend - jeśli masz token JWT ---
    /*
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
    */

    setLoading(false);
  }, []);

  // Funkcja logowania
  const handleLogin = (fullName /*, tokenFromServer */) => {
    setUser(fullName);
    // setToken(tokenFromServer); // odkomentuj przy backendzie

    localStorage.setItem('user', fullName);
    // localStorage.setItem('token', tokenFromServer); // odkomentuj przy backendzie
  };

  // Funkcja wylogowania
  const handleLogout = () => {
    localStorage.removeItem('user');
    // localStorage.removeItem('token'); // odkomentuj przy backendzie
    setUser(null);
    // setToken(null); // odkomentuj przy backendzie
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Ładowanie...</p>;

  return (
    <>
      {user ? (
        <WeatherDashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;