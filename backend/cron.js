import cron from 'node-cron';
import { getLatestJsonBlobs } from './azureBlob.js';
import { pool } from './db.js';

cron.schedule('/5 * * *', async () => {
  console.log('[CRON] Start checking blobs...');

  try {
    const measurements = await getLatestJsonBlobs();

    for (const entry of measurements) {
      const { device_id, timestamp, temperature, humidity, pm25 } = entry;

      await pool.query(
        `INSERT INTO measurements (device_id, timestamp, temperature, humidity, pm25)
         VALUES ($1, $2, $3, $4, $5)`,
        [device_id, timestamp, temperature, humidity, pm25]
      );
    }

    console.log(`[CRON] Wczytano ${measurements.length} pomiarów`);
  } catch (err) {
    console.error('[CRON] Błąd:', err.message);
  }
});
