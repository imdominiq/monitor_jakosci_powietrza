require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { EventHubConsumerClient } = require('@azure/event-hubs');
const { setSensorData } = require('./sensorData');
const airRoutes = require('./routes/air');
const favoritesRoutes = require('./routes/favorites');
const { supabase } = require('./supabaseClient'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Konfiguracja Event Hub
const eventHubConnectionString = process.env.EVENT_HUB_CONNECTION_STRING;
const eventHubName = process.env.EVENT_HUB_NAME;

async function startListening() {
  const client = new EventHubConsumerClient('$Default', eventHubConnectionString, eventHubName);

  client.subscribe({
  processEvents: async (events) => {
    for (const event of events) {
      try {
        const data = event.body;
        console.log('📡 Otrzymano dane z sensora:', data);

        setSensorData(data);

        // 🔥 ZAPIS DO SUPABASE
        const { error } = await supabase
          .from('measurements')
          .insert([
            {
              pm25: parseFloat(data.pm25),
              pm10: parseFloat(data.pm10),
              city: data.city || 'unknown',
              timestamp: data.timestamp || new Date().toISOString(),
            },
          ]);

        if (error) {
          console.error('❌ Błąd przy zapisie do Supabase:', error.message);
        } else {
          console.log('✅ Zapisano dane do Supabase');
        }
      } catch (err) {
        console.error('❌ Błąd przy przetwarzaniu zdarzenia:', err);
      }
    }
  },
  processError: async (err) => {
    console.error('❌ Błąd subskrypcji Event Huba:', err);
  },
});

}

app.use('/api/air', airRoutes);
app.use('/api/favorites', favoritesRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend działa na http://localhost:${PORT}`);
  startListening().catch(err => {
    console.error('❌ Nie udało się uruchomić nasłuchiwania Event Huba:', err);
  });
});
