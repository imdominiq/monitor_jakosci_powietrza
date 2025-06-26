const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Supabase config (Twoje dane)
const SUPABASE_URL = 'https://lisqweyorxlyrgequxtq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpc3F3ZXlvcnhseXJnZXF1eHRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODk0MTcsImV4cCI6MjA2NjM2NTQxN30.Bu3njd4iGe50Z8Y2rYebjspu2dl7noC3f8OAjoMJRQA';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Airly config (Twój klucz)
const AIRLY_API_KEY = '97FFM9FIpIZpUKvFvoz5ZtI8P4HvSV0Y';

// --------------------------------------
// POBIERANIE DANYCH Z AIRLY I ZAPIS DO BAZY
// --------------------------------------

app.get('/api/air', async (req, res) => {
  const lat = req.query.lat || '51.1079';
  const lon = req.query.lon || '17.0385';

  try {
    const url = `https://airapi.airly.eu/v2/measurements/point?lat=${lat}&lng=${lon}`;
    const headers = { "Accept": "application/json", "apikey": AIRLY_API_KEY };
    const response = await fetch(url, { headers });
    const json = await response.json();

    const values = json.current?.values || [];

    const pm25 = values.find(v => v.name === "PM25")?.value || null;
    const pm10 = values.find(v => v.name === "PM10")?.value || null;
    const o3   = values.find(v => v.name === "O3")?.value || null;
    const no2  = values.find(v => v.name === "NO2")?.value || null;

    const timestamp = new Date().toISOString();

    if (pm25 !== null && pm10 !== null) {
      const { error } = await supabase
        .from('measurements')
        .insert([{
          timestamp,
          pm25,
          pm10,
          o3,
          no2,
          lat: parseFloat(lat),
          lon: parseFloat(lon)
        }]);

      if (error) {
        console.error("❌ Błąd zapisu do measurements:", error.message);
        return res.status(500).json({ error: error.message });
      }

      console.log("✅ Zapisano do Supabase.");
    }

    res.json({ timestamp, pm25, pm10, o3, no2 });
  } catch (err) {
    console.error("❌ Błąd backendu:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------
// DODAWANIE DO FAVORITES
// --------------------------------------

app.post('/api/favorites', async (req, res) => {
  const { user_id, city, lat, lon, pm25, pm10, o3, no2 } = req.body;

  try {
    const { error } = await supabase
      .from('favorites')
      .insert([{
        user_id,
        city,
        lat,
        lon,
        pm25,
        pm10,
        o3,
        no2
      }]);

    if (error) throw error;

    res.status(200).json({ message: '✅ Dodano do ulubionych' });
  } catch (err) {
    console.error('❌ Błąd zapisu do favorites:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------
// POBIERANIE FAVORITES DLA UŻYTKOWNIKA
// --------------------------------------

app.get('/api/favorites/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Błąd odczytu favorites:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------
// USUWANIE FAVORITE PO ID
// --------------------------------------

app.delete('/api/favorites/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: '❌ Usunięto z ulubionych' });
  } catch (err) {
    console.error('❌ Błąd usuwania favorites:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------
// START SERWERA
// --------------------------------------

app.listen(PORT, () => {
  console.log(`✅ Serwer działa na http://localhost:${PORT}`);
});
