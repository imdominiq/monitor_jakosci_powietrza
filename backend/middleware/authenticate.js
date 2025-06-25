const { supabase } = require('../supabaseClient');

module.exports = async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Brak tokena autoryzacji' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Nieprawidłowy token' });
  }

  req.user = user;
  next();
};
