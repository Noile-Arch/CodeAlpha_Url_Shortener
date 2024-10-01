const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Use dynamic import for ES module `nanoid`
let nanoid;
(async () => {
  nanoid = (await import('nanoid')).nanoid;
})();

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/urlshortener', {
  dbName:"urlshortener"
});

// URL model
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const URL = mongoose.model('URL', urlSchema);

// Route for shortening URLs
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  
  // Check if the URL already exists
  let existingUrl = await URL.findOne({ originalUrl });
  if (existingUrl) {
    return res.json({ shortUrl: `http://localhost:5000/${existingUrl.shortUrl}` });
  }

  // Create a short URL once `nanoid` is loaded
  const shortUrl = nanoid(6);  // Generates a 6-character unique ID
  const newUrl = new URL({ originalUrl, shortUrl });
  
  await newUrl.save();
  
  res.json({ shortUrl: `http://localhost:5000/${shortUrl}` });
});

// Route for redirecting to the original URL
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  
  // Find the original URL from the shortened version
  const urlEntry = await URL.findOne({ shortUrl });
  
  if (urlEntry) {
    return res.redirect(urlEntry.originalUrl);
  } else {
    return res.status(404).json({ error: 'URL not found' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
