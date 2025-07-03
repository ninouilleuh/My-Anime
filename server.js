
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

const fs = require('fs');
const path = require('path');


const animeDataPath = path.join(__dirname, 'animeData.json');

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

// GET /api/anime - fetch all anime
app.get('/api/anime', (req, res) => {
    fs.readFile(animeDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading animeData.json:', err);
            return res.status(500).json({ error: 'Failed to read anime data.' });
        }
        try {
            const animeList = JSON.parse(data);
            res.json(animeList);
        } catch (parseErr) {
            console.error('Error parsing animeData.json:', parseErr);
            res.status(500).json({ error: 'Failed to parse anime data.' });
        }
    });
});

// POST /api/anime - add a new anime
app.post('/api/anime', (req, res) => {
    const newAnime = req.body;
    if (!newAnime || !newAnime.id || !newAnime.name) {
        return res.status(400).json({ error: 'Anime object with at least id and name is required.' });
    }
    fs.readFile(animeDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading animeData.json:', err);
            return res.status(500).json({ error: 'Failed to read anime data.' });
        }
        let animeList;
        try {
            animeList = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing animeData.json:', parseErr);
            return res.status(500).json({ error: 'Failed to parse anime data.' });
        }
        // Prevent duplicate IDs
        if (animeList.some(anime => anime.id === newAnime.id)) {
            return res.status(409).json({ error: 'Anime with this ID already exists.' });
        }
        animeList.push(newAnime);
        fs.writeFile(animeDataPath, JSON.stringify(animeList, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing animeData.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save anime data.' });
            }
            res.status(201).json(newAnime);
        });
    });
});

// GET /api/anime/:id - fetch a single anime by ID
app.get('/api/anime/:id', (req, res, next) => {
    // Ignore /views subroute
    if (req.params.id === 'views') return next();

    const animeId = req.params.id;
    fs.readFile(animeDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading animeData.json:', err);
            return res.status(500).json({ error: 'Failed to read anime data.' });
        }
        let animeList;
        try {
            animeList = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing animeData.json:', parseErr);
            return res.status(500).json({ error: 'Failed to parse anime data.' });
        }
        const anime = animeList.find(a => a.id === animeId);
        if (!anime) {
            return res.status(404).json({ error: 'Anime not found.' });
        }
        res.json(anime);
    });
});

// PATCH /api/anime/:id - update an anime by ID
app.patch('/api/anime/:id', (req, res, next) => {
    // Ignore /views subroute
    if (req.params.id === 'views') return next();

    const animeId = req.params.id;
    const updateFields = req.body;
    fs.readFile(animeDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading animeData.json:', err);
            return res.status(500).json({ error: 'Failed to read anime data.' });
        }
        let animeList;
        try {
            animeList = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing animeData.json:', parseErr);
            return res.status(500).json({ error: 'Failed to parse anime data.' });
        }
        const anime = animeList.find(a => a.id === animeId);
        if (!anime) {
            return res.status(404).json({ error: 'Anime not found.' });
        }
        // Update only the provided fields
        Object.keys(updateFields).forEach(key => {
            anime[key] = updateFields[key];
        });

        // Ensure the animeList is written to disk synchronously and check for errors
        try {
            fs.writeFileSync(animeDataPath, JSON.stringify(animeList, null, 2), 'utf8');
        } catch (writeErr) {
            console.error('Error writing animeData.json:', writeErr);
            return res.status(500).json({ error: 'Failed to update anime data.' });
        }
        res.json(anime);
    });
});
// --- VIEW COUNTS ENDPOINTS ---
// GET /api/anime/:id/views - get view count for an anime
app.get('/api/anime/:id/views', (req, res) => {
    const animeId = req.params.id;
    fs.readFile(animeDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading animeData.json:', err);
            return res.status(500).json({ error: 'Failed to read anime data.' });
        }
        let animeList;
        try {
            animeList = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing animeData.json:', parseErr);
            return res.status(500).json({ error: 'Failed to parse anime data.' });
        }
        const anime = animeList.find(a => a.id === animeId);
        if (!anime) {
            return res.status(404).json({ error: 'Anime not found.' });
        }
        res.json({ id: animeId, views: anime.views || 0 });
    });
});

// POST /api/anime/:id/views - increment view count for an anime
app.post('/api/anime/:id/views', (req, res) => {
    const animeId = req.params.id;
    fs.readFile(animeDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading animeData.json:', err);
            return res.status(500).json({ error: 'Failed to read anime data.' });
        }
        let animeList;
        try {
            animeList = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing animeData.json:', parseErr);
            return res.status(500).json({ error: 'Failed to parse anime data.' });
        }
        const anime = animeList.find(a => a.id === animeId);
        if (!anime) {
            return res.status(404).json({ error: 'Anime not found.' });
        }
        anime.views = (anime.views || 0) + 1;
        fs.writeFile(animeDataPath, JSON.stringify(animeList, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing animeData.json:', writeErr);
                return res.status(500).json({ error: 'Failed to update view count.' });
            }
            res.json({ id: animeId, views: anime.views });
        });
    });
});

app.listen(PORT, () => {
    console.log(`AnimeRashii backend running on port ${PORT}`);
});
