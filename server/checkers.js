class Checkers {
  constructor() {
    this.board = [];
  }

  initBoard() {
    for (let i = 0; i < 8; i++) {
      this.board[i] = [];
      
      for (let j = 0; j < 8; j++) {
        
        if ((i + j) % 2 === 0) {
          this.board[i][j] = new Cell(false);
        } else {
          this.board[i][j] = new Cell(true);
          if (i <= 2) this.board[i][j].togglePiece(1);
          if (i >= 5) this.board[i][j].togglePiece(2);
        }
      }
    }

  }
}

class Cell {
  constructor(isDark) {
    this.isDark = isDark;
    this.piece = null;
  }

  togglePiece(piece = null) {
    this.piece = piece;
  }
}

class King {

}

module.exports.Checkers = Checkers;