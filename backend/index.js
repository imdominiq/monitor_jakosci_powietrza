import express from 'express';
import dotenv from 'dotenv';
import { pool } from './db.js';
import './cron.js';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM measurements ORDER BY timestamp DESC LIMIT 100'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

app.post('/api/send/data', async (req, res) => {
  const { device_id, timestamp, temperature, humidity, pm25 } = req.body;
  // if (!device_id || !timestamp) {
  //   return res.status(400).send('Brak wymaganych danych');
  // }
  
  try {
    const temperatureNum = parseFloat(temperature);
    const humidityNum = parseFloat(humidity);
    const pm25Num = parseFloat(pm25);

    await pool.query(
      `INSERT INTO measurements (device_id, timestamp, temperature, humidity, pm25)
      VALUES ($1, $2, $3, $4, $5)`,
      [device_id, timestamp, temperatureNum, humidityNum, pm25Num]
    );
    
    res.status(201).send('Pomiary zapisane');
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd serwera');
  }
});

app.get('/test', (req, res) => {
  res.send('API działa!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});