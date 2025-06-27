const express = require('express');
const router = express.Router();
const { supabase } = require('../supabaseClient');

router.get('/all', async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('get_favorites_with_latest_measurements');

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Błąd pobierania favorites + pomiary:', err.message);
    res.status(500).json({ error: err.message });
  }
});


router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Błąd odczytu favorites:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { user_id, city, lat, lon } = req.body;

  if (!user_id || !city || !lat || !lon) {
    return res.status(400).json({ error: 'Brak wymaganych danych' });
  }

  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id, city, lat, lon }])
    .select('*');

  console.log('error:', error);
  console.log('data:', data);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(500).json({ error: 'Nie udało się dodać lokalizacji (brak zwróconych danych)' });
  }

  res.status(201).json(data[0]);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(204).send();
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { city, lat, lon } = req.body;

  if (!city) return res.status(400).json({ error: 'Brak nazwy miasta' });

  const { data, error } = await supabase
    .from('favorites')
    .update({ city, lat, lon })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  if (!data || data.length === 0) return res.status(404).json({ error: 'Nie znaleziono rekordu' });

  res.json(data[0]);
});

module.exports = router;
