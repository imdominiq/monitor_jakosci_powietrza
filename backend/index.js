import express from 'express';
import dotenv from 'dotenv';
import { pool } from './db.js';
import './cron.js';

dotenv.config();
const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});