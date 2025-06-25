# 🌫️ Air Quality Monitoring App

Aplikacja do monitorowania jakości powietrza w czasie rzeczywistym, wykorzystująca **Airly API** do pobierania danych, **Supabase** do ich przechowywania oraz **React** do ich wyświetlania.

---

## 📁 Struktura projektu

```
monitor_jakosci_powietrza/
│
├── backend/            # Express.js backend
│   ├── index.js        # Główna logika API i zapis do Supabase
│   └── .env            # Klucze i konfiguracje
│
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/ # Komponenty interfejsu
│   └── .env            # Adres backendu
│
├── .gitignore
├── README.md
```

---

## ⚙️ Technologie

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Baza danych**: Supabase (PostgreSQL)
- **API zewnętrzne**: [Airly API](https://developer.airly.org/)

---

## 🚀 Uruchomienie projektu

### 🔧 Backend

1. Przejdź do folderu `backend`:

   ```bash
   cd backend
   npm install
   ```

2. Stwórz plik `.env`:

   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   AIRLY_API_KEY=your_airly_api_key
   ```

3. Uruchom serwer:

   ```bash
   node index.js
   ```

   Serwer działa domyślnie na `http://localhost:3001`.

---

### 💻 Frontend

1. Przejdź do folderu `frontend`:

   ```bash
   cd frontend
   npm install
   ```

2. Stwórz plik `.env`:

   ```env
   VITE_API_URL=http://localhost:3001
   ```

3. Uruchom aplikację:

   ```bash
   npm run dev
   ```

   Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

---

## 📊 Funkcjonalności

- 🔍 Wyszukiwanie lokalizacji (domyślnie: Wrocław)
- 🌫️ Pobieranie danych PM2.5 i PM10 z Airly API
- 📥 Zapisywanie pomiarów do Supabase
- 📈 Wyświetlanie aktualnych i historycznych danych (do 4h wstecz)

---

## 🛡️ Uwaga bezpieczeństwa

Nie umieszczaj swoich kluczy API ani danych `.env` w repozytorium publicznym. Zadbaj, aby `.env` był uwzględniony w `.gitignore`.

---

## 🧪 Przykładowe zapytania

Pobierz aktualne dane jakości powietrza:

```
GET http://localhost:3001/api/air?lat=51.1079&lon=17.0385
```

---

## 📃 Licencja

Projekt stworzony do celów edukacyjnych.