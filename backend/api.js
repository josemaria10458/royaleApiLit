const express = require('express');
const cors = require('cors');

const https = require('https');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE = 'https://api.clashroyale.com/v1';
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE1M2ZjZDlhLTc1YTQtNDRjNC1iMWVlLWJiMGMwNTBiMzNjNiIsImlhdCI6MTc2MzkwNTc1Niwic3ViIjoiZGV2ZWxvcGVyL2RjOTI4MzMzLWQwNjMtMzBjMi1iN2Q2LTRmZDBhMGM0NTNmMSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNjUuMjI1LjkyLjEwMyIsIjE0Ny4xNjEuMTkwLjExMiIsIjE0Ny4xNjEuMTkwLjEyMSIsIjE0Ny4xNjEuMTkwLjEwMyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.vZgc41-TfkMXSG_jeKaNca_2kVimFpQ6p5excSkx6L6MaKKBCVUSYxGNZA1RXc1RJtgW6dMDWgKCxqXqwTS6YQ';

app.use(cors()); // ajustar origen si quieres restringir
app.use(express.json());

const agent = new https.Agent({
  rejectUnauthorized: false
});
 
axios.get('https://api.clashroyale.com/v1/cards', {
  httpsAgent: agent,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  }
})
.then(res => console.log(res.data))
.catch(err => console.error(err));

axios.get('https://api.clashroyale.com/v1/clans', {
  httpsAgent: agent,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
  params: {
    minMembers: 20
  }
})
.then(res => console.log(res.data))
.catch(err => console.error(err));

if (!TOKEN) {
  console.error('Missing ROYALE_API_TOKEN in environment');
  process.exit(1);
}

app.get('/cards', async (req, res) => {
    console.log('Fetching cards from Clash Royale API 22');

  try {
    console.log('Fetching cards from Clash Royale API');
    const response = await axios.get(`${API_BASE}/cards`, {
        httpsAgent: agent,
        headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/json'
      },
      timeout: 10000
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      // error desde la API externa
      res.status(err.response.status).json({
        message: 'Error from upstream API',
        details: err.response.data
      });
    } else {
      // error de red / timeout / otro
      res.status(500).json({ message: 'Server error', details: err.message });
    }
  }
});

app.get('/clans', async (req, res) => {
    console.log('Fetching clans from Clash Royale API 22');
  try {
    const response = await axios.get(`${API_BASE}/clans`, {
        httpsAgent: agent,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: 'application/json'
        },
        params: {
          minMembers: req.query.minMembers || 20,
        },
      timeout: 10000
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      // error desde la API externa
      res.status(err.response.status).json({
        message: 'Error from upstream API',
        details: err.response.data
      });
    } else {
      // error de red / timeout / otro
      res.status(500).json({ message: 'Server error', details: err.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`API proxy listening on http://localhost:${PORT}`);
});