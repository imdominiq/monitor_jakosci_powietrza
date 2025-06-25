require('dotenv').config();

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const { supabase } = require('./supabaseClient');

async function fetchAndStoreAirData(lat, lon) {
  const url = `https://airapi.airly.eu/v2/measurements/point?lat=${lat}&lng=${lon}`;
  const headers = {
    Accept: 'application/json',
    apikey: process.env.AIRLY_API_KEY,
  };

  const response = await fetch(url, { headers });
  const json = await response.json();

  const values = json?.current?.values || [];
  const pm25 = values.find((v) => v.name === 'PM25')?.value || null;
  const pm10 = values.find((v) => v.name === 'PM10')?.value || null;

  if (pm25 && pm10) {
    const timestamp = new Date().toISOString();
    await supabase.from("measurements").insert([{
      timestamp,
      pm25,
      pm10,
      lat: parseFloat(lat),
      lon: parseFloat(lon)
    }]);
  }

  return { pm25, pm10 };
}

module.exports = { fetchAndStoreAirData };
