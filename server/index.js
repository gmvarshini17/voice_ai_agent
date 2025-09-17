const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Create a directory for storing audio files if it doesn't exist
const audioDir = path.join(__dirname, 'public', 'audio');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Serve static audio files
app.use('/public/audio', express.static(path.join(__dirname, 'public', 'audio')));

// --- ElevenLabs API Endpoints ---

// Endpoint to get available voices from ElevenLabs
app.get('/api/voices', async (req, res) => {
    try {
        const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
            headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching ElevenLabs voices:', error.message);
        res.status(500).json({ message: 'Failed to fetch voices from ElevenLabs.' });
    }
});

// --- Main Call Logic Endpoint ---

// Endpoint to generate voice and place a call
app.post('/api/call', async (req, res) => {
    const { text, voiceId, phoneNumber } = req.body;

    if (!text || !voiceId || !phoneNumber) {
        return res.status(400).json({ message: 'Missing required fields: text, voiceId, phoneNumber' });
    }

    try {
        // 1. Generate Audio using ElevenLabs TTS API 
        const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
        const response = await axios.post(
            elevenLabsUrl,
            { text: text, model_id: 'eleven_multilingual_v2' },
            { headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY }, responseType: 'stream' }
        );

        const audioFileName = `${uuidv4()}.mp3`;
        const audioFilePath = path.join(audioDir, audioFileName);
        const writer = fs.createWriteStream(audioFilePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // 2. Prepare for Telephony (Exotel) 
        const audioUrl = `${process.env.BASE_URL}/public/audio/${audioFileName}`;
        console.log(`Generated audio accessible at: ${audioUrl}`);

        // 3. Place the call using Exotel or Simulate [cite: 30]
        if (process.env.SIMULATE_CALL === 'true') {
            // Simulation logic [cite: 31]
            console.log('\n--- CALL SIMULATION ---');
            console.log(`Initiating call to: ${phoneNumber}`);
            console.log(`Playing audio from URL: ${audioUrl}`);
            console.log('--- END SIMULATION ---\n');
            res.json({ message: 'Call simulated successfully. Check server logs.' });
        } else {
            // Real Exotel API call
            const exomlUrl = `${process.env.BASE_URL}/api/exoml?audioUrl=${encodeURIComponent(audioUrl)}`;
            
            const exotelApiUrl = `https://api.exotel.com/v1/Accounts/${process.env.EXOTEL_ACCOUNT_SID}/Calls/connect.json`;

            const params = new URLSearchParams();
            params.append('From', process.env.EXOTEL_VIRTUAL_NUMBER);
            params.append('To', phoneNumber);
            params.append('Url', exomlUrl);
            params.append('CallerId', process.env.EXOTEL_VIRTUAL_NUMBER);

            const auth = 'Basic ' + Buffer.from(`${process.env.EXOTEL_API_KEY}:${process.env.EXOTEL_API_TOKEN}`).toString('base64');

            const exotelResponse = await axios.post(exotelApiUrl, params, {
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            console.log('Exotel call initiated:', exotelResponse.data);
            res.json({ message: 'Call initiated successfully!', data: exotelResponse.data });
        }
    } catch (error) {
        console.error('Error in /api/call:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'An error occurred during the process.' });
    }
});

// Endpoint to serve dynamic ExoML to Exotel
app.get('/api/exoml', (req, res) => {
    const { audioUrl } = req.query;
    if (!audioUrl) {
        return res.status(400).send('Audio URL is required.');
    }

    const exoml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play>${decodeURIComponent(audioUrl)}</Play>
</Response>`;
    
    res.type('text/xml');
    res.send(exoml);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});