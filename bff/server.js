const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const apiKey = 'AIzaSyD1kiPGSh0dga__S9rZ3DDJcJGWP05VU8o';

app.use(cors());

app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=12&key=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('BFF running on port 3000');
});
