const axios = require('axios');
const csv = require('csv-parser');
const AdmZip = require('adm-zip');
const { Readable } = require('stream');
const db = require('./db');

// Helper: parse a CSV string or stream into an array of objects
function parseCSVStream(stream) {
  return new Promise((resolve, reject) => {
    const results = [];
    stream
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// -------------------------------------------------------------------
// 1. Load world population (direct CSV)
// -------------------------------------------------------------------
async function loadPopulation() {
  console.log('Downloading population.csv...');
  const response = await axios.get(
    'https://raw.githubusercontent.com/datasets/population/main/data/population.csv',
    { responseType: 'stream' }
  );
  const rows = await parseCSVStream(response.data);
  for (const row of rows) {
    await db.query(
      `INSERT INTO population (country_name, year, population)
       VALUES ($1, $2, $3)`,
      [
        row['Country Name'],
        parseInt(row['Year'], 10) || null,
        parseInt(row['Value'], 10) || null,
      ]
    );
  }
  console.log(`Loaded ${rows.length} population records.`);
}

// -------------------------------------------------------------------
// 2. Load global CO2 emissions (direct CSV)
// -------------------------------------------------------------------
async function loadCO2() {
  console.log('Downloading global.csv (CO2)...');
  const response = await axios.get(
    'https://raw.githubusercontent.com/datasets/co2-fossil-global/main/data/global.csv',
    { responseType: 'stream' }
  );
  const rows = await parseCSVStream(response.data);
  for (const row of rows) {
    await db.query(
      `INSERT INTO co2_emissions (year, co2_emissions)
       VALUES ($1, $2)`,
      [
        parseInt(row['Year'], 10) || null,
        parseFloat(row['Global CO2']) || null,
      ]
    );
  }
  console.log(`Loaded ${rows.length} CO2 records.`);
}

// -------------------------------------------------------------------
// 3. Load Gapminder data from ZIP
// -------------------------------------------------------------------
// async function loadGapminder() {
//   console.log('Downloading plotly-datasets-master.zip...');
//   const response = await axios.get(
//     'https://github.com/plotly/datasets/archive/master.zip',
//     { responseType: 'arraybuffer' }
//   );
//   const zip = new AdmZip(Buffer.from(response.data));
// Look for gapminderData.csv inside the archive
//   const entry = zip.getEntry('datasets-master/gapminderData.csv');
//   if (!entry) throw new Error('gapminderData.csv not found in the ZIP');

//   const csvData = entry.getData().toString('utf8');
//   const stream = Readable.from(csvData);
//   const rows = await parseCSVStream(stream);

//   for (const row of rows) {
//     await db.query(
//       `INSERT INTO gapminder (country, year, population, continent, life_exp, gdp_per_cap)
//        VALUES ($1, $2, $3, $4, $5, $6)`,
//       [
//         row['country'],
//         parseInt(row['year'], 10) || null,
//         parseInt(row['pop'], 10) || null,
//         row['continent'],
//         parseFloat(row['lifeExp']) || null,
//         parseFloat(row['gdpPercap']) || null,
//       ]
//     );
//   }
//   console.log(`Loaded ${rows.length} gapminder records.`);
// }

// -------------------------------------------------------------------
// Run all ETL steps
// -------------------------------------------------------------------
(async () => {
  try {
    await loadPopulation();
    await loadCO2();
    // await loadGapminder();
    console.log('ETL completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('ETL failed:', err);
    process.exit(1);
  }
})();