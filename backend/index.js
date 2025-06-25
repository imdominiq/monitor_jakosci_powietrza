const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const SUPABASE_URL = "https://lisqweyorxlyrgequxtq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const AIRLY_API_KEY = "97FFM9FIpTzpUXkJFvoz5tZI8pH4VsVO";

app.get('/api/air', async (req, res) => {
    const lat = req.query.lat || "51.1079";
    const lon = req.query.lon || "17.0385";

    try {
        const url = `https://airapi.airly.eu/v2/measurements/point?lat=${lat}&lng=${lon}`;
        const headers = { "Accept": "application/json", "apikey": AIRLY_API_KEY };
        const response = await fetch(url, { headers });
        const json = await response.json();

        const values = json?.current?.values || [];
        const pm25 = values.find(v => v.name === "PM25")?.value || null;
        const pm10 = values.find(v => v.name === "PM10")?.value || null;
        const o3 = values.find(v => v.name === "O3")?.value || null;
        const no2 = values.find(v => v.name === "NO2")?.value || null;

        const timestamp = new Date().toISOString();

        if (pm25 != null && pm10 != null) {
            const { error } = await supabase.from("measurements").insert([{
                timestamp,
                pm25,
                pm10,
                o3,
                no2,
                lat: parseFloat(lat),
                lon: parseFloat(lon)
            }]);

            if (error) {
                console.error("❌ Błąd zapisu do Supabase:", error.message);
            } else {
                console.log("✅ Zapisano do Supabase:", timestamp, pm25, pm10, o3, no2);
            }
        }

        res.json({ timestamp, pm25, pm10, o3, no2 });
    } catch (err) {
        console.error("❌ Błąd backendu:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Backend działa na http://localhost:${PORT}`);
});
