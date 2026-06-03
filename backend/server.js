const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/db');

const app = express();
app.use(cors());
app.use(express.json());



// Population
app.get('/api/population', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM population ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CO2 emissions
app.get('/api/co2', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM co2_emissions ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gapminder
app.get('/api/gapminder', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM gapminder ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
// ... (rest of server.js)