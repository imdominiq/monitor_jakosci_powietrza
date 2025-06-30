const mqtt = require('mqtt');

const iotHubName = 'monitor-sensor';
const deviceId = 'sensor';
const sasToken = 'SharedAccessSignature sr=monitor-sensor.azure-devices.net%2Fdevices%2Fsensor&sig=cu5%2Fb28B2w3VcFoaSc8ZYQQB7R63FaBqQaWomN%2FcIjI%3D&se=1751311345';

const mqttHost = `${iotHubName}.azure-devices.net`;
const mqttPort = 8883;

const options = {
  clientId: deviceId,
  username: `${iotHubName}.azure-devices.net/${deviceId}/?api-version=2021-04-12`,
  password: sasToken,
  protocol: 'mqtts',
  port: mqttPort,
  keepalive: 60,
  reconnectPeriod: 1000
};

const client = mqtt.connect(`mqtts://${mqttHost}`, options);

// === PUBLIKACJA ===
client.on('connect', () => {
  console.log('✅ Połączono z Azure IoT Hub przez MQTT');

  const payload = {
    city: 'Wrocław',
    pm25: Math.floor(Math.random() * 30),
    pm10: Math.floor(Math.random() * 50),
    timestamp: new Date().toISOString()
  };

  const topic = `devices/${deviceId}/messages/events/`;
  const message = JSON.stringify(payload);

  client.publish(topic, message, {}, (err) => {
    if (err) {
      console.error('❌ Błąd wysyłania:', err);
    } else {
      console.log('📡 Wysłano dane:', message);
      client.end();
    }
  });
});

client.on('error', (err) => {
  console.error('❌ Błąd połączenia MQTT:', err);
});
