const express = require('express');
const app = express();
const port = 3000;
const db = require('./database/db');
const axios = require('axios');

// Statische Dateien (CSS, Bilder, JavaScript) im "public" Verzeichnis servieren
app.use(express.static('public'));

// EJS als Template-Engine einstellen
app.set('view engine', 'ejs');

// Definition der Anzahl der Bilder pro Seite
const imagesPerPage = 9;

app.get('/', async (req, res) => {
  let jsonRequest = axios.get('https://weissenberge-data.srv-lino-02.surmatik.ch/heating-data/all_data.json');
  
  try {
    const response = await Promise.race([
      jsonRequest,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout'), 5000)))
    ]);

    const heatingData = response.data;
    const aussentemperatur = heatingData.AUSSENTEMPERATUR;

    res.render('index', { aussentemperatur });
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    
    res.render('index', { aussentemperatur: '-' });
  }
});

app.get('/webcam', async (req, res) => {
  const page = req.query.page || 1;
  const offset = (page - 1) * imagesPerPage;

  try {
    const totalImages = await db.getTotalImagesCount();
    const images = await db.getImagesPerPage(imagesPerPage, offset);

    const hasNextPage = (page * imagesPerPage) < totalImages;
    const nextPage = hasNextPage ? page + 1 : null;

    res.render('webcam', { images, page, nextPage });
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    res.status(500).send('Ein Fehler ist aufgetreten.');
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
