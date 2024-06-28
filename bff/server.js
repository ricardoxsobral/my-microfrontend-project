const express = require('express');
const axios = require('axios');
const app = express();

const apiKey = 'AIzaSyD1kiPGSh0dga__S9rZ3DDJcJGWP05VU8o';

app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}`);
    console.log('API Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('BFF running on port 3000');
});