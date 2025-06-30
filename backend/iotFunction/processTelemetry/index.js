const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async function (context, eventHubMessages) {
  for (const message of eventHubMessages) {
    context.log('📥 Otrzymano wiadomość z IoT Hub:', message);

    const response = await fetch('https://lisqweyorxlyrgequxtq.supabase.co/rest/v1/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_KEY}`
      },
      body: JSON.stringify({
        city: message.city || 'Unknown',
        lat: message.lat || null,
        lon: message.lon || null,
        user_id: 'c8c6f93d-e30a-4f85-a28d-2c0f0e949fe9'
      })
    });

    if (!response.ok) {
      context.log.error('❌ Błąd zapisu do Supabase:', await response.text());
    } else {
      context.log('✅ Zapisano do Supabase');
    }
  }
};
