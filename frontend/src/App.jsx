import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import WeatherDashboard from './Dashboard/WeatherDashboard';
import MetricsDetails from './components/Metrics/MetricsDetail';

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={user ? <WeatherDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/metrics"
          element={user ? <MetricsDetails /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;