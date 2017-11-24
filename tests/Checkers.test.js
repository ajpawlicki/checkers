const { Checkers, Square } = require('../server/checkers-logic');

describe('Testing Checkers methods', () => {
  describe('getSquare', () => {
    it('Returns a valid square if within row and col boundaries of board', () => {
      const game = new Checkers();
      game.initBoard();

      const input = game.getSquare(0, 1);
      const expected = new Square(0, 1);
      expected.piece = 1;
      
      expect(input).toEqual(expected);
    });

    it('Returns null if outside of row boundary', () => {
      const game = new Checkers();
      game.initBoard();

      const input = game.getSquare(-10, 0);
      
      expect(input).toBeNull();
    });

    it('Returns null if outside of col boundary', () => {
      const game = new Checkers();
      game.initBoard();

      const input = game.getSquare(0, 100);
      
      expect(input).toBeNull();
    });
  });

  describe('isSameSquare', () => {
    
  });
});