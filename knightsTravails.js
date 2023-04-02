class Knight {
  constructor(position = [3, 3]) {
    this.position = position.toString();
  }
}

class Graph {
  #adjList; 
  #board;
  #visited;
  #moves;

  constructor() {
    this.#adjList = new Map();
    this.#board = this.createBoard();
    this.#visited = new Set();
    this.#moves = [];
    this.graph = this.createGraph();
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board.push([i, j]);
        this.addVertex([i, j].toString());
      }
    }

    return board;
  }

  addEdge(position, move) {
    this.#adjList.get(position).push(move);
  }

  addVertex(position) {
    this.#adjList.set(position, []);
  }

  createGraph() {
    for (let cell of this.#board) {
      const allowedMoves = this.getAllowedMoves(cell);
      for (let move of allowedMoves) {
        this.addEdge(cell.toString(), move.toString());
      }
    }

    return this.#adjList;
  }

  getAllowedMoves(position) {
    const allowedMoves = [];
    const move1 = [position[0] + 1, position[1] + 2];
    if (this.compareArrays(move1)) allowedMoves.push(move1);
    const move2 = [position[0] + 2, position[1] + 1];
    if (this.compareArrays(move2)) allowedMoves.push(move2);
    const move3 = [position[0] + 2, position[1] - 1];
    if (this.compareArrays(move3)) allowedMoves.push(move3);
    const move4 = [position[0] + 1, position[1] - 2];
    if (this.compareArrays(move4)) allowedMoves.push(move4);
    const move5 = [position[0] - 1, position[1] - 2];
    if (this.compareArrays(move5)) allowedMoves.push(move5);
    const move6 = [position[0] - 2, position[1] - 1];
    if (this.compareArrays(move6)) allowedMoves.push(move6);
    const move7 = [position[0] - 2, position[1] + 1];
    if (this.compareArrays(move7)) allowedMoves.push(move7);
    const move8 = [position[0] - 1, position[1] + 2];
    if (this.compareArrays(move8)) allowedMoves.push(move8);

    return allowedMoves;
  }

  compareArrays(arr) {
    for (let position of this.#board) {
      if (position.toString() === arr.toString()) return true;
    }
  }

  knightMoves(start, end) {
    if (start === end) {
      this.#moves.push(start);
      console.log(`=> You made it in ${this.#moves.length} moves! Here's your path:`);
      for (let move of this.#moves) console.log(move);
      return [...this.#moves, start];
    }
    
    // If the node has not been visited yet, mark it as visited
    if (!this.#visited.has(start)) {
      this.#visited.add(start);
      this.#moves.push(start);
      
      // Recursively visit each neighboring node
      const neighbors = this.graph.get(start);
      let shortestPath = null;

      for (let neighbor of neighbors) {
        const newPath = this.knightMoves(neighbor, end);
        if (newPath && (!shortestPath || newPath.length < shortestPath.length)) {
          shortestPath = newPath;
          return shortestPath;
        }
        this.#moves.pop();
      }
    }
    // seguir aquí (comparar todos los paths)
  }
}

const startKnight = new Knight([3, 3]);
const endKnight = new Knight([4, 3]);
const board = new Graph();
board.knightMoves(startKnight.position, endKnight.position);
