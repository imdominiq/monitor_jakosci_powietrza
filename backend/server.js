const express = require('express');
const mqtt = require('mqtt');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = 'https://lisqweyorxlyrgequxtq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpc3F3ZXlvcnhseXJnZXF1eHRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODk0MTcsImV4cCI6MjA2NjM2NTQxN30.Bu3njd4iGe50Z8Y2rYebjspu2dl7noC3f8OAjoMJRQA';
const supabase = createClient(supabaseUrl, supabaseKey);

const mqttClient = mqtt.connect('mqtt://localhost:1883');

mqttClient.on('connect', () => {
  console.log('Połączono z brokerem MQTT');
  mqttClient.subscribe('locations/new', (err) => {
    if (err) console.error('Błąd subskrypcji:', err);
  });
});

mqttClient.on('message', async (topic, message) => {
  if (topic === 'locations/new') {
    try {
      const payload = JSON.parse(message.toString());
      console.log('Odebrano wiadomość MQTT:', payload);

      // Zapis do Supabase
      const { error } = await supabase
        .from('favorites')
        .insert([{ 
          user_id: payload.user_id || null,
          city: payload.city,
          lat: payload.lat,
          lon: payload.lon
        }]);

      if (error) {
        console.error('Błąd zapisu do Supabase:', error);
      } else {
        console.log('Dane zapisane do Supabase');
      }
    } catch (e) {
      console.error('Błąd parsowania wiadomości MQTT:', e);
    }
  }
});

// Endpoint do pobierania ulubionych (z pomiarami PM)
app.get('/api/favorites', async (req, res) => {
  try {
    // Możesz zrobić join lub pobrać dane pomiarów osobno i dodać ręcznie
    // Na prosty start pobierz tylko z favorites (bez pomiarów)
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
