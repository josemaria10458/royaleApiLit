const express = require('express');
const cors = require('cors');

const https = require('https');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE = 'https://api.clashroyale.com/v1';
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRjNGFkNjgyLTJiNDktNGM3MS05NjM5LWFlNDRhNTEzYzY5ZiIsImlhdCI6MTc2MjUwNTA5Mywic3ViIjoiZGV2ZWxvcGVyL2RjOTI4MzMzLWQwNjMtMzBjMi1iN2Q2LTRmZDBhMGM0NTNmMSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNDcuMTYxLjE5MC4xMTIiXSwidHlwZSI6ImNsaWVudCJ9XX0.ZWWbzzzroSObSEtU3lOs9zMkyYCqAJnVST-YSdOt7KTAtujupHO2gwr9qDeDgV5RF5bJL5esf-8cOM_9EPT8KA';

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

app.listen(PORT, () => {
  console.log(`API proxy listening on http://localhost:${PORT}`);
});