
// client.open((err) => {
//   if (err) {
//     console.error('❌ Błąd połączenia z IoT Hub:', err.message);
//   } else {
//     console.log('✅ Połączono z IoT Hub, wysyłanie danych...');
//     setInterval(() => {
//       const payload = {
//         temperature: (20 + Math.random() * 5).toFixed(2),
//         humidity: (30 + Math.random() * 10).toFixed(2),
//         timestamp: new Date().toISOString(),
//       };
//       const message = new Message(JSON.stringify(payload));
//       client.sendEvent(message, (err) => {
//         if (err) console.error('❌ Błąd wysyłania:', err);
//         else console.log('📤 Wysłano wiadomość:', payload);
//       });
//     }, 5000); // co 5 sekund
//   }
// });
require('dotenv').config();

const { Client, Message } = require('azure-iot-device');
const { Mqtt } = require('azure-iot-device-mqtt');

const connectionString = process.env.IOT_DEVICE_CONNECTION_STRING;
const client = Client.fromConnectionString(connectionString, Mqtt);

function getRandomAirQuality() {
  return {
    pm25: (Math.random() * 100).toFixed(2),
    pm10: (Math.random() * 150).toFixed(2),
    city: 'Warsaw',
    timestamp: new Date().toISOString(),
  };
}

async function sendMessage() {
  const data = getRandomAirQuality();
  const message = new Message(JSON.stringify(data));
  console.log('Sending message:', message.getData());
  try {
    await client.sendEvent(message);
  } catch (err) {
    console.error('Failed to send message:', err);
  }
}

client.open()
  .then(() => {
    console.log('Sensor connected to IoT Hub');
    setInterval(sendMessage, 5000);
  })
  .catch(err => console.error('Could not connect:', err));
