const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('✅ Połączono jako publisher');

  const payload = {
    city: 'Warszawa',
    lat: 52.2297,
    lon: 21.0122,
    pm25: 10.5,
    pm10: 22.3,
    timestamp: new Date().toISOString()
  };

  client.publish('air/measurements', JSON.stringify(payload), () => {
    console.log('📤 Wysłano dane pomiarowe!');
    client.end();
  });
});
