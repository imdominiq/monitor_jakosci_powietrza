const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const SUPABASE_URL = "https://lisqweyorxlyrgequxtq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpc3F3ZXlvcnhseXJnZXF1eHRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODk0MTcsImV4cCI6MjA2NjM2NTQxN30.Bu3njd4iGe50Z8Y2rYebjspu2dl7noC3f8OAjoMJRQA";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const AIRLY_API_KEY = "97FFM9FIpTzpUXkJFvoz5tZI8pH4VsVO";

app.get('/api/air', async (req, res) => {
    const lat = req.query.lat || "51.1079";
    const lon = req.query.lon || "17.0385";

    try {
        const url = `https://airapi.airly.eu/v2/measurements/point?lat=${lat}&lng=${lon}`;
        const headers = {
            "Accept": "application/json",
            "apikey": AIRLY_API_KEY
        };

        const response = await fetch(url, { headers });
        const json = await response.json();

        const values = json?.current?.values || [];
        const pm25 = values.find(v => v.name === "PM25")?.value || null;
        const pm10 = values.find(v => v.name === "PM10")?.value || null;

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

        res.json({ pm25, pm10 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Backend działa na http://localhost:${PORT}`);
});