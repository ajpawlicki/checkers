class Checkers {
  constructor() {
    this.board = [];
  }

  initBoard() {
    for (let i = 0; i < 8; i++) {
      this.board[i] = [];
      
      for (let j = 0; j < 8; j++) {
        
        if ((i + j) % 2 === 0) { // pieces can't move to this square
          this.board[i][j] = null;
        } else {
          this.board[i][j] = new Square();

          if (i <= 2) this.board[i][j].addPiece(1);
          if (i >= 5) this.board[i][j].addPiece(2);
        }

      }
    }

  }

  isValidMove(piece, fromPosition, toPosition) {
    const fromSquare = this.board[fromPosition.row][fromPosition.col];
    const toSquare = this.board[toPosition.row][toPosition.col];

    if (toSquare.isOccupied()) return false;
    
    if (piece === 2 && this.isValidMoveUp(piece, fromPosition, toPosition)) return true;

    if (piece === 1 && this.isValidMoveDown(piece, fromPosition, toPosition)) return true;

    return false;
  }

  isValidMoveUp(piece, fromPosition, toPosition, delta = 1) {
    // If neighboring square is not occupied then return true if valid row and valid col
    const isValidRow = +fromPosition.row - delta === +toPosition.row;
    const isValidRightCol = +fromPosition.col + delta === +toPosition.col
    const isValidLeftCol = +fromPosition.col - delta === +toPosition.col;

    return (isValidRow && isValidLeftCol) || (isValidRow && isValidRightCol);

    // If neighboring square is occupied then check if it's a valid move if delta is incremented
    // Can only make recursive call if "jumping"
  }

  checkIfNeighborsAreOccupied(pos) {

  }

  isValidMoveDown(piece, fromPosition, toPosition) {
    const isValidRow = +fromPosition.row + 1 === +toPosition.row;
    const isValidCol = +fromPosition.col + 1 === +toPosition.col || +fromPosition.col - 1 === +toPosition.col;

    return isValidRow && isValidCol;
  }

  movePiece(piece, fromPosition, toPosition) {
    if (this.isValidMove(piece, fromPosition, toPosition)) {
      this.board[fromPosition.row][fromPosition.col].removePiece();
      this.board[toPosition.row][toPosition.col].addPiece(piece);
    } else {
      throw new Error('Invalid move.');
    }
  }
}

class Square {
  constructor() {
    this.piece = null;
  }

  addPiece(piece) {
    if (this.isOccupied()) {
      throw new Error('Square is already occupied.');
    } else {
      this.piece = piece;
    }
  }

  removePiece() {
    this.piece = null;
  }

  isOccupied() {
    return this.piece !== null;
  }
}

class King {

}

module.exports = {
  Checkers,
  Square,
  King
};
