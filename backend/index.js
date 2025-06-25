require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { fetchAndStoreAirData } = require('./airlyService');
const { supabase } = require('./supabaseClient');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/air', async (req, res) => {
  const lat = req.query.lat || '51.1079';
  const lon = req.query.lon || '17.0385';

  try {
    const data = await fetchAndStoreAirData(lat, lon);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/air/history', async (req, res) => {
  const since = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(); // 4 godziny wstecz

  const { data, error } = await supabase
    .from("measurements")
    .select("*")
    .gte("timestamp", since)
    .order("timestamp", { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`✅ Backend działa na http://localhost:${PORT}`);
});
