const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 9000;

const matchesData = require('./matches.json');
const playoffData = require('./playoff.json');

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server ruuning on port ${port}`);
});

app.get('/api/kalkulacka/all-matches', (req, res) => {
  res.status(200).json(matchesData);
});

app.get('/api/kalkulacka/play-off', (req, res) => {
  res.status(200).json(playoffData);
});