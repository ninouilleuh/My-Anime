
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;


// --- MongoDB Setup ---
const { MongoClient } = require('mongodb');
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://palomaresnina3:7p06iMGSkXb2GJKE@animerashii.g7ag9dk.mongodb.net/';
const client = new MongoClient(MONGO_URI);
let animeCollection;

async function connectMongo() {
  if (!animeCollection) {
    await client.connect();
    const db = client.db('animerashii'); // DB name
    animeCollection = db.collection('anime');
  }
}

// Serve static files (HTML, JS, CSS, images) from project root
app.use(express.static(__dirname));

app.use(cors({
  origin: [
    'https://ninouilleuh.github.io',
    'http://localhost:3000', // add your local dev domain if needed
    'http://localhost:3001'
  ],
  credentials: true
}));
app.use(bodyParser.json());

// Configure your email transport (SendGrid)
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
        user: 'apikey', // this is literally the string 'apikey'
        pass: process.env.SENDGRID_API_KEY // Read from environment variable
    }
});

app.post('/suggest-anime', async (req, res) => {
    const { animeName, animeDesc } = req.body;
    if (!animeName) {
        return res.status(400).json({ error: 'Anime name is required.' });
    }
    const mailOptions = {
        from: 'animerashii@outlook.com', // or any verified sender in SendGrid
        to: 'palomaresnina3@gmail.com',
        subject: 'anime suggest ANIMERASHII',
        text: `Anime Name: ${animeName}\nDescription: ${animeDesc || 'N/A'}`
    };
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (err) {
        console.error('Email send error:', err);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

// GET /api/anime - fetch all anime (MongoDB)
app.get('/api/anime', async (req, res) => {
  await connectMongo();
  const animeList = await animeCollection.find({}).toArray();
  res.json(animeList);
});

// POST /api/anime - add a new anime (MongoDB)
app.post('/api/anime', async (req, res) => {
  await connectMongo();
  const newAnime = req.body;
  if (!newAnime || !newAnime.id || !newAnime.name) {
    return res.status(400).json({ error: 'Anime object with at least id and name is required.' });
  }
  const exists = await animeCollection.findOne({ id: newAnime.id });
  if (exists) return res.status(409).json({ error: 'Anime with this ID already exists.' });
  await animeCollection.insertOne(newAnime);
  res.status(201).json(newAnime);
});

// GET /api/anime/:id - fetch a single anime by ID (MongoDB)
app.get('/api/anime/:id', async (req, res, next) => {
  if (req.params.id === 'views') return next();
  await connectMongo();
  const anime = await animeCollection.findOne({ id: req.params.id });
  if (!anime) return res.status(404).json({ error: 'Anime not found.' });
  res.json(anime);
});

// PATCH /api/anime/:id - update an anime by ID (MongoDB)
app.patch('/api/anime/:id', async (req, res, next) => {
  if (req.params.id === 'views') return next();
  await connectMongo();
  const updateFields = req.body;
  const result = await animeCollection.findOneAndUpdate(
    { id: req.params.id },
    { $set: updateFields },
    { returnDocument: 'after' }
  );
  if (!result.value) return res.status(404).json({ error: 'Anime not found.' });
  res.json(result.value);
});
// --- VIEW COUNTS ENDPOINTS (MongoDB) ---
// GET /api/anime/:id/views - get view count for an anime
app.get('/api/anime/:id/views', async (req, res) => {
  await connectMongo();
  const anime = await animeCollection.findOne({ id: req.params.id });
  if (!anime) return res.status(404).json({ error: 'Anime not found.' });
  res.json({ id: req.params.id, views: anime.views || 0 });
});

// POST /api/anime/:id/views - increment view count for an anime
app.post('/api/anime/:id/views', async (req, res) => {
  await connectMongo();
  const result = await animeCollection.findOneAndUpdate(
    { id: req.params.id },
    { $inc: { views: 1 } },
    { returnDocument: 'after' }
  );
  if (!result.value) return res.status(404).json({ error: 'Anime not found.' });
  res.json({ id: req.params.id, views: result.value.views || 0 });
});

app.listen(PORT, () => {
    console.log(`AnimeRashii backend running on port ${PORT}`);
});
