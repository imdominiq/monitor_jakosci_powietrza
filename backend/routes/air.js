const express = require('express');
const router = express.Router();
const { fetchAndStoreAirData } = require('../airlyService');
const { supabase } = require('../supabaseClient');
const { getSensorData } = require('../sensorData');

// --- DANE Z AIRLY ---
router.get('/', async (req, res) => {
  const lat = req.query.lat || '51.1079';
  const lon = req.query.lon || '17.0385';

  try {
    const data = await fetchAndStoreAirData(lat, lon);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- HISTORIA Z SUPABASE ---
router.get('/history', async (req, res) => {
  const since = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString();

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


router.get('/sensor', (req, res) => {
  const latestData = getSensorData();

  if (Object.keys(latestData).length === 0) {
    return res.status(404).json({ error: 'No sensor data available yet.' });
  }

  res.json(latestData);
});

module.exports = router