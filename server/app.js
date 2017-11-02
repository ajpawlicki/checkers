const express = require('express');
const app = express();

const Checkers = require('./checkers.js').Checkers;

const checkers = new Checkers();
checkers.initBoard();

app.use(express.static(__dirname + '/../client'));

app.get('/getBoard', (req, res) => {
  res.send(checkers.board);
});

app.listen(7000, () => console.log('Listening on port 7000!'));