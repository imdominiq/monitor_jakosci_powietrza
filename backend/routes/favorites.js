const express = require('express');
const router = express.Router();
const { supabase } = require('../supabaseClient');

router.get('/', async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).json({ error: 'Brak user_id w zapytaniu' });
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

router.post('/', async (req, res) => {
  const { user_id, city, lat, lon } = req.body;

  if (!user_id || !city || !lat || !lon) {
    return res.status(400).json({ error: 'Brak wymaganych danych' });
  }

  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id, city, lat, lon }]);

  if (error) {
    return res.status(500).json({ error: error.message });
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

module.exports = router;
