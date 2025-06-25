const express = require('express');
const router = express.Router();
const { fetchAndStoreAirData } = require('../airlyService');
const { supabase } = require('../supabaseClient');

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

module.exports = router;
