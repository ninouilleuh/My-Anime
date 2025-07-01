const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Configure your email transport (SendGrid)
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
        user: 'apikey', // this is literally the string 'apikey'
        pass: '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' // <-- replace with your SendGrid API key
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

app.listen(PORT, () => {
    console.log(`AnimeRashii backend running on port ${PORT}`);
});
