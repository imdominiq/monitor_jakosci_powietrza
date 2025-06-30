const mqtt = require('mqtt');

// === DANE KONFIGURACYJNE ===
const host = 'mqtts://monitor-sensor.azure-devices.net:8883';
const deviceId = 'sensor';
const hubName = 'monitor-sensor';
const sasToken = 'SharedAccessSignature sr=monitor-sensor.azure-devices.net%2Fdevices%2Fsensor&sig=cu5%2Fb28B2w3VcFoaSc8ZYQQB7R63FaBqQaWomN%2FcIjI%3D&se=1751311345'; // <-- Wklej swój token tutaj

const username = `${hubName}.azure-devices.net/${deviceId}/?api-version=2021-04-12`;

// === DANE DO WYSŁANIA ===
const payload = JSON.stringify({
  city: 'Wrocław',
  temperature: 23.5,
  humidity: 40,
  timestamp: new Date().toISOString()
});

// === POŁĄCZENIE I PUBLIKACJA ===
const client = mqtt.connect(host, {
  clientId: deviceId,
  username,
  password: sasToken,
  protocol: 'mqtts'
});

client.on('connect', () => {
  console.log('✅ Połączono z Azure IoT Hub (MQTT)');
  client.publish(`devices/${deviceId}/messages/events/`, payload, {}, (err) => {
    if (err) {
      console.error('❌ Błąd publikacji:', err);
    } else {
      console.log('📤 Dane wysłane do Azure IoT Hub:', payload);
    }
    client.end();
  });
});
