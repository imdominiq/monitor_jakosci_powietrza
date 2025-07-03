require('dotenv').config();

const { EventHubConsumerClient } = require("@azure/event-hubs");
const express = require("express");

const connectionString = process.env.IOT_DEVICE_CONNECTION_STRING;
const eventHubName = "iot-hub-cdv"; // zazwyczaj to nazwa IoT Hub lub specjalny endpoint

const app = express();
app.use(express.json());

let latestData = {};

async function startListening() {
  const client = new EventHubConsumerClient("$Default", connectionString, eventHubName);

  client.subscribe({
    processEvents: async (events) => {
      for (const event of events) {
        try {
          const data = event.body;
          console.log("Received event:", data);
          // Załóżmy, że dane to JSON z sensora
          latestData = data; // aktualizujemy najnowsze dane
        } catch (err) {
          console.error("Error processing event:", err);
        }
      }
    },
    processError: async (err) => {
      console.error("Error in event hub subscription:", err);
    }
  });
}

app.get("/api/air", (req, res) => {
  res.json(latestData);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
  startListening();
});
