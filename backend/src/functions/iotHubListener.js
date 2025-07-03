const { app } = require('@azure/functions');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.eventHub('iotHubListener', {
  connection: 'IotHubEventHubConnectionString', // wpisz tę nazwę również w local.settings.json
  eventHubName: 'iot-hub-cdv', // lub odpowiednią nazwę z IoT Hub
  cardinality: 'many',
  handler: async (messages, context) => {
    for (const message of messages) {
      context.log('📩 Otrzymano wiadomość z IoT Hub:', message);

      const { city, lat, lon } = message;

      const { error } = await supabase.from('measurements').insert([
        {
          city: city || null,
          lat: lat || null,
          lon: lon || new Date().toISOString(),
        }
      ]);

      if (error) {
        context.log('❌ Błąd przy zapisie do Supabase:', error);
      } else {
        context.log('✅ Zapisano pomiar do Supabase.');
      }
    }
  }
});
