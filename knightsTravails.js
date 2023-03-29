class Knight {
  constructor(x = 3, y = 3) {
    this.x = x;
    this.y = y;
  }

  get position() {
    return [x, y];
  }
}

class Board {
  constructor() {
    this.board = this.createBoard();
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board.push([i, j]);
      }
    }

    return board;
  }
}

const board = new Board();
console.log(board.board);