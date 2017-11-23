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

  movePiece(fromPosition, toPosition) {
    
  }
}

class Square {
  constructor() {
    this.piece = null;
  }

  addPiece(piece) {
    if (this.piece === null) {
      this.piece = piece;
    } else {
      throw new Error('Square is already occupied.');
    }
  }

  removePiece() {
    this.piece = null;
  }
}

class King {

}

module.exports = {
  Checkers
};
