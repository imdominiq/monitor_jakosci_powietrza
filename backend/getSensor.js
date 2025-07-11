import { Client, Message } from 'azure-iot-device';
import { Mqtt } from 'azure-iot-device-mqtt';

const connectionString = 'HostName=iothubcdvpaid.azure-devices.net;DeviceId=sensor-02;SharedAccessKey=3VeArR+adsn/ZEdwNSyA7Fhn7u88Dr09dJ7xNcQI910=';

const client = Client.fromConnectionString(connectionString, Mqtt);

async function main() {
  try {
    await client.open();
    console.log('Połączono z Azure IoT Hub');

    // Wysyłanie telemetryki co 10 sekund
    setInterval(() => {
      const telemetry = {
        device_id: 'sensor-001',
        timestamp: new Date().toISOString(),
        temperature: (20 + Math.random() * 10).toFixed(2),
        humidity: (40 + Math.random() * 20).toFixed(2),
        pm25: (5 + Math.random() * 10).toFixed(2),
      };

      const message = new Message(JSON.stringify(telemetry));
      client.sendEvent(message, (err) => {
        if (err) console.error('Błąd wysyłania telemetryki:', err);
        else console.log('Wysłano telemetrykę:', telemetry);
      });
    }, 10000);

    // Nasłuch na wiadomości (komendy) z chmury
    client.on('message', (msg) => {
      console.log('Otrzymano komendę z chmury:', msg.data.toString());
      // Potwierdzamy odbiór wiadomości
      client.complete(msg, (err) => {
        if (err) console.error('Błąd potwierdzenia wiadomości:', err);
      });

      // Tutaj możesz dodać obsługę komendy, np. zmienić parametry sensora
    });

  } catch (err) {
    console.error('Błąd klienta IoT:', err);
  }
}

main();
