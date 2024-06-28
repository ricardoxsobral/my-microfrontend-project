const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('MF_DRAWER Home Page');
});

app.listen(3000, () => {
  console.log('MF_DRAWER running on port 3000');
});