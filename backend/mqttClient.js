const mqtt = require('mqtt');

const deviceId = 'sensor-01';
const iotHubHostname = 'iot-hub-cdv.azure-devices.net';
const primaryKey = 'Xc+IIi7uUyx/uZyR8Pz1yNgdwIbdhWrgZMPMAnJOrpQ=';

const client = mqtt.connect(`mqtts://${iotHubHostname}`, {
  clientId: deviceId,
  username: `${iotHubHostname}/${deviceId}/?api-version=2021-04-12`,
  password: primaryKey,
  protocolId: 'MQTT',
  protocolVersion: 4
});

client.on('connect', () => {
  console.log('✅ Połączono z Azure IoT Hub');
  setInterval(() => {
    const payload = {
      temperature: (Math.random() * 10 + 20).toFixed(2),
      timestamp: new Date().toISOString()
    };
    client.publish(`devices/${deviceId}/messages/events/`, JSON.stringify(payload));
    console.log('📤 Wysłano dane:', payload);
  }, 10000); // co 10 sekund
});
