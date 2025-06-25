require('dotenv').config();

const express = require('express');
const cors = require('cors');

const airRoutes = require('./routes/air');
const favoritesRoutes = require('./routes/favorites');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/air', airRoutes);
app.use('/api/favorites', favoritesRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend działa na http://localhost:${PORT}`);
});
