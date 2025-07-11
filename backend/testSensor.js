import fetch from 'node-fetch';

const backendUrl = 'https://appservicecdv-dse9f4e5fhh9bdg9.canadacentral-01.azurewebsites.net/api/send/data';

function randomMeasurement() {
  return {
    device_id: 'sensor-001',
    timestamp: new Date().toISOString(),
    temperature: (20 + Math.random() * 10).toFixed(2),
    humidity: (40 + Math.random() * 20).toFixed(2),
    pm25: (5 + Math.random() * 10).toFixed(2),
  };
}

async function sendMeasurement() {
  const data = randomMeasurement();
  try {
    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log('Wysłano pomiar:', data);
    } else {
      console.error('Błąd wysyłania:', await res.text());
    }
  } catch (err) {
    console.error('Błąd sieci:', err);
  }
}

// Wyślij co 10 sekund
setInterval(sendMeasurement, 10000);
