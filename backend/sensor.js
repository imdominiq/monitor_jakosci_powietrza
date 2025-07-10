const { Client } = require('azure-iot-device');
const { Mqtt } = require('azure-iot-device-mqtt');
const connectionString = 'HostName=monitor-sensor.azure-devices.net;DeviceId=sensor;SharedAccessKey=OcuUQi7gHH7FFPU9IXhKbQvl++vU4twC6Yim+aXfK9s=';

const client = Client.fromConnectionString(connectionString, Mqtt);

function sendTelemetry() {
  const data = {
    temperature: 22 + Math.random() * 5,
    humidity: 40 + Math.random() * 10,
    pm25: 15 + Math.random() * 10,
  };

  const message = new Message(JSON.stringify(data));
  client.sendEvent(message, err => {
    if (err) console.error('Send error:', err);
    else console.log('Wysłano:', data);
  });
}

client.open(err => {
  if (err) return console.error('Błąd połączenia:', err);
  console.log('Połączono z IoT Hub!');
  setInterval(sendTelemetry, 10000);
});