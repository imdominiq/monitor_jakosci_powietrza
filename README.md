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
## 🚀 Testowanie projektu
🔹 1. Test: Domyślne wyświetlanie miasta
Opis: Po uruchomieniu aplikacji domyślnie powinno pojawić się miasto „Wrocław”.

Kroki:

- Otwórz aplikację.

- Sprawdź nagłówek na głównym ekranie.

Oczekiwany wynik: Na górze strony widnieje Wrocław.

🔹 2. Test: Zmiana miasta poprzez wyszukiwarkę
Opis: Użytkownik może wpisać nazwę miasta i wybrać jedną z propozycji.

Kroki:

- Wpisz np. Poznań w pole „Wyszukaj miasto...”.

- Kliknij z listy wyników „Poznań”.

Oczekiwany wynik: Główna nazwa miasta zmienia się na Poznań.

🔹 3. Test: Zapamiętywanie ostatnio wybranego miasta
Opis: Po odświeżeniu strony ostatnio wybrane miasto powinno się załadować automatycznie.

Kroki:

- Wybierz miasto Kraków.

- Odśwież stronę.

Oczekiwany wynik: Główna nazwa miasta to nadal Kraków.

🔹 4. Test: Autouzupełnianie miast podczas dodawania do ulubionych (autocomplete)
Opis: Po wpisaniu kilku liter pojawiają się sugestie nazw miast.

Kroki:

- Wpisz np. Pł lub War.

Oczekiwany wynik: Lista podpowiedzi zawiera m.in. Płońsk, Warszawa itd.

🔹 5. Test: Wyświetlanie danych pogodowych
Opis: Dla wybranego miasta pojawiają się sekcje z aktualnymi danymi i dodatkowymi metrykami.

Kroki:

- Wybierz miasto Wrocław.

- Sprawdź sekcje: „CurrentWeather”, „AdditionalMetrics”.

Oczekiwany wynik: Widoczne są dane o stanie powietrza (np. PM2.5, PM10).

🔹 6. Test: Wykres pomiarów historycznych
Opis: Dla lokalizacji dostępnych w bazie pojawia się wykres z danymi historycznymi.

Kroki:

- Wybierz miasto, które było wcześniej zapisane (np. Poznań).

- Przejdź do sekcji z wykresem (jeśli występuje).

Oczekiwany wynik: Widoczny wykres ze zmianami wskaźników.

🔹 7. Test: Dodawanie lokalizacji do ulubionych (bez konta)
Opis: Dodanie lokalizacji przez formularz ulubionych.

Kroki:

- Wpisz nazwę miasta, współrzędne, kliknij „Dodaj”.

- Odśwież stronę.

Oczekiwany wynik: Nowa lokalizacja pojawia się na liście ulubionych (jeśli zapis działa publicznie).

🔎 Uwaga: Jeśli baza Supabase ma aktywne zabezpieczenia RLS (Row Level Security), dodawanie bez konta może być zablokowane. W takim przypadku oczekuj błędu lub braku efektu.

## 📃 Licencja

Projekt stworzony do celów edukacyjnych.
