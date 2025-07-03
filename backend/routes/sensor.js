const express = require('express');
const router = express.Router();

let latestData = {}; // aktualizowane gdzieś globalnie w backendzie Event Hub listenerem

router.get('/', (req, res) => {
    return 'dupa';
  if (Object.keys(latestData).length === 0) {
    return res.status(404).json({ error: 'No sensor data available yet.' });
  }
  res.json(latestData);
});

module.exports = router;
