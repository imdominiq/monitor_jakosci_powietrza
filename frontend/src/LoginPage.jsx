import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // ✅ WERSJA TESTOWA (localStorage – działa bez backendu)
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (isRegistering) {
      if (users[formData.email]) {
        setError('Użytkownik o tym emailu już istnieje.');
        return;
      }

      users[formData.email] = {
        password: formData.password,
        name: formData.name,
        surname: formData.surname,
      };
      localStorage.setItem('users', JSON.stringify(users));
      const fullName = `${formData.name} ${formData.surname}`;
      localStorage.setItem('user', fullName);
      onLogin(fullName);
    } else {
      const user = users[formData.email];
      if (!user || user.password !== formData.password) {
        setError('Nieprawidłowy email lub hasło.');
        return;
      }
      const fullName = `${user.name} ${user.surname}`;
      localStorage.setItem('user', fullName);
      onLogin(fullName);
    }

    // ✅ BACKEND – odkomentuj, gdy backend będzie gotowy:
    /*
    try {
      const endpoint = isRegistering ? "/api/register" : "/api/login";
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Błąd");
      }

      const data = await res.json();
      const fullName = `${data.user.name} ${data.user.surname}`;
      onLogin(fullName);
    } catch (err) {
      setError(err.message);
    }
    */
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Rejestracja' : 'Logowanie'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isRegistering && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Imię"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Nazwisko"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">
          {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
        </button>
      </form>
      <p style={{ marginTop: '10px' }}>
        {isRegistering ? 'Masz już konto?' : 'Nie masz konta?'}{' '}
        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
          style={{
            color: '#6b47dc',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isRegistering ? 'Zaloguj się' : 'Zarejestruj się'}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;