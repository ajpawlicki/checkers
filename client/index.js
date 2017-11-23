window.onload = () => {
  const boardEl = document.getElementById('board');
  const rowEls = document;
  
  fetchBoard(boardEl);
  
  let move = null;

  boardEl.addEventListener('click', function(event) {
    if (event && event.target.classList.contains('piece')) {
      const square = event.target.parentNode;
      
      let row = square.getAttribute('data-row');
      let col = square.getAttribute('data-col');

      move = {
        fromPosition: { row, col }
      }

    }

    if (move && event.target.classList.contains('dark') ) {
      let row = event.target.getAttribute('data-row');
      let col = event.target.getAttribute('data-col');
      
      move.toPosition = { row, col };



      move = null;
    }
  });
};

function renderBoard(board, boardEl) {
  board.forEach((row, rowIndex) => {
    const rowEl = document.createElement('tr');
    rowEl.classList.add('row');
    
    row.forEach((square, colIndex) => {
      const squareEl = document.createElement('td');
      squareEl.classList.add('square');

      if (square) {
        squareEl.classList.add('dark');

        squareEl.dataset.row = rowIndex;
        squareEl.dataset.col = colIndex;
      }
      
      if (square && square.piece) {
        const pieceEl = document.createElement('p');
        pieceEl.classList.add('piece');

        if (square.piece === 1) pieceEl.classList.add('yellow');
        if (square.piece === 2) pieceEl.classList.add('blue');

        squareEl.appendChild(pieceEl);
      }

      rowEl.appendChild(squareEl);
    });
    
    boardEl.appendChild(rowEl);
  });
};

function fetchBoard(boardEl) {
  fetch('/getBoard')
  .then(res => res.json())
  .then(data => {
    renderBoard(data, boardEl);
  })
  .catch(err => {
    console.error(err);
  });
};

function postMove(move) {
  
};
