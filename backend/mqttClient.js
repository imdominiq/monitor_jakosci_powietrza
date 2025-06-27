const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('📡 Połączono z brokerem MQTT');
  client.subscribe('air/measurements', (err) => {
    if (err) console.error('❌ Błąd subskrypcji:', err);
  });
});

client.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    console.log('📨 Odebrano dane:', payload);

    // Przykład: zapis do Supabase
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    await supabase.from('measurements').insert([payload]);
  } catch (err) {
    console.error('❌ Błąd przetwarzania wiadomości:', err);
  }
});

module.exports = client;
