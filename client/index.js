window.onload = () => {
  const boardEl = document.getElementById('board');
  
  fetch('/getBoard')
  .then(res => res.json())
  .then(data => {
    renderBoard(data, boardEl);
  })
  .catch(err => {
    console.error(err);
  });
};

function renderBoard(board, boardEl) {
  board.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');
    
    row.forEach(cell => {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');

      if (cell.isDark) cellEl.classList.add('dark');
      
      if (cell.piece) {
        const pieceEl = document.createElement('span');
        pieceEl.classList.add('piece');

        if (cell.piece === 1) pieceEl.classList.add('yellow');
        if (cell.piece === 2) pieceEl.classList.add('blue');

        cellEl.appendChild(pieceEl);
      }

      rowEl.appendChild(cellEl);
    });
    
    boardEl.appendChild(rowEl);
  });
};