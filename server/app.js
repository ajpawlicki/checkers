const express = require('express');
const app = express();

const { Checkers } = require('./checkers-logic.js');

const checkers = new Checkers();
checkers.initBoard();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/../client'));

app.get('/getBoard', (req, res) => {
  res.send(checkers.board);
});

app.post('/postMove', (req, res) => {
  const move = req.body;
  
  try {
    checkers.movePiece(+move.piece, move.fromPosition, move.toPosition);
  }
  catch (err) {
    res.status(400);
  }
  
  res.end();
});

app.listen(7000, () => console.log('Listening on port 7000!'));
