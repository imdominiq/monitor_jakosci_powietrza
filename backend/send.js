const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Połączono z MQTT brokerem');

  const message = {
    user_id: 'c8c6f93d-e30a-4f85-a28a-2c0f0e949fe9',
    city: 'Wrocław',
    lat: 51.1079,
    lon: 17.0385,
  };

  client.publish('locations/new', JSON.stringify(message), () => {
    console.log('Wysłano dane do MQTT');
    client.end();
  });
});
