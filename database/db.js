// database/db.js

require('dotenv').config();

const { Pool } = require('pg');

// PostgreSQL-Verbindung konfigurieren
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function getImagesPerPage(perPage, offset) {
  try {
    const client = await pool.connect();
    const query = `SELECT filename FROM webcam1 ORDER BY timestamp DESC LIMIT $1 OFFSET $2`;
    const values = [perPage, offset];
    const result = await client.query(query, values);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Fehler beim Abrufen der Bilder:', error);
    throw error;
  }
}

async function getTotalImagesCount() {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT COUNT(*) FROM webcam1');
      client.release();
      return parseInt(result.rows[0].count);
    } catch (error) {
      console.error('Fehler beim Abrufen der Gesamtanzahl der Bilder:', error);
      throw error;
    }
}

module.exports = {
    getImagesPerPage,
    getTotalImagesCount,
};
