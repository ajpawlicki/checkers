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
          this.board[i][j] = new Square(i, j);

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

  isValidMoveUp(piece, fromPosition, toPosition) {
    const potentialMoveRow = fromPosition.row - 1;
    const potentialLeftMoveCol = fromPosition.col - 1;
    const potentialRightMoveCol = fromPosition.col + 1;

    const potentialLeftMoveSquare = this.getSquare(potentialMoveRow, potentialLeftMoveCol);
    const potentialRightMoveSquare = this.getSquare(potentialMoveRow, potentialRightMoveCol);
    
    if (potentialLeftMoveSquare && !potentialLeftMoveSquare.isOccupied()
      && this.isSameSquare(toPosition, potentialLeftMoveSquare)) {
        return true;
    }

    if (potentialRightMoveSquare && !potentialRightMoveSquare.isOccupied()
      && this.isSameSquare(toPosition, potentialRightMoveSquare)) {
        return true;
    }

    return this.handleJump(piece, fromPosition, toPosition, -1);
  }

  handleJump(piece, fromPosition, toPosition, delta) {
    const potentialLeftMoveSquare = this.getSquare(fromPosition.row + delta, fromPosition.col - 1);
    const potentialRightMoveSquare = this.getSquare(fromPosition.row + delta, fromPosition.col + 1);

    const leftJumpSquare = this.getSquare(fromPosition.row + (delta * 2), fromPosition.col - 2);
    
    if (leftJumpSquare && !leftJumpSquare.isOccupied()
      && potentialLeftMoveSquare.hasDiffPiece(piece)
      && this.isSameSquare(toPosition, leftJumpSquare)) {
        potentialLeftMoveSquare.removePiece();
        return true;
    }

    const rightJumpSquare = this.getSquare(fromPosition.row + (delta * 2), fromPosition.col + 2);
    
    if (rightJumpSquare && !rightJumpSquare.isOccupied()
      && potentialRightMoveSquare.hasDiffPiece(piece)
      && this.isSameSquare(toPosition, rightJumpSquare)) {
        potentialRightMoveSquare.removePiece();
        return true;
    }
    
    // if (this.handleJump(piece, fromPosition, toPosition, delta * 2) === true) return true;
  }
  
  isValidMoveDown(piece, fromPosition, toPosition) {
    const potentialMoveRow = fromPosition.row + 1;
    const potentialLeftMoveCol = fromPosition.col - 1;
    const potentialRightMoveCol = fromPosition.col + 1;

    const potentialLeftMoveSquare = this.getSquare(potentialMoveRow, potentialLeftMoveCol);
    const potentialRightMoveSquare = this.getSquare(potentialMoveRow, potentialRightMoveCol);
    
    if (potentialLeftMoveSquare && !potentialLeftMoveSquare.isOccupied()
      && this.isSameSquare(toPosition, potentialLeftMoveSquare)) {
        return true;
    }

    if (potentialRightMoveSquare && !potentialRightMoveSquare.isOccupied()
      && this.isSameSquare(toPosition, potentialRightMoveSquare)) {
        return true;
    }

    return this.handleJump(piece, fromPosition, toPosition, 1);
  }

  getSquare(row, col) {
    if (this.board[row] && this.board[row][col]) return this.board[row][col];
    return null;
  }

  isSameSquare(toPosition, square) {
    return toPosition.row === square.row && toPosition.col === square.col;
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
  constructor(row, col) {
    this.piece = null;
    this.row = row;
    this.col = col;
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

  hasDiffPiece(piece) {
    return this.piece !== null && this.piece !== piece;
  }
}

class King {

}

module.exports = {
  Checkers,
  Square,
  King
};
