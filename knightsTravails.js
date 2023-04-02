class Knight {
  constructor(position = [3, 3]) {
    this.position = position.toString();
  }
}

class Graph {
  #adjList; 
  #board;

  constructor() {
    this.#adjList = new Map();
    this.#board = this.createBoard();
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
    const startNode = start.position;
    const endNode = end.position;
    const queue = [startNode];
    const shortestPath = {[startNode]: [startNode]};
    
    while (queue.length > 0) {
      const currentNode = queue.shift();
      
      if (currentNode === endNode) {
        console.log(`=> You made it in ${shortestPath[currentNode].length - 1} moves!  Here's your path:`)
        for (let move of shortestPath[currentNode]) {
          console.log(move);
        }
        return ;
      }
      
      const neighbors = this.graph.get(currentNode);
      for (let neighbor of neighbors) {
        if (!shortestPath.hasOwnProperty(neighbor)) {
          queue.push(neighbor);
          shortestPath[neighbor] = [...shortestPath[currentNode], neighbor];
        }
      }
    }
  }
}

const startKnight = new Knight([0, 0]);
const endKnight = new Knight([7, 7]);
const board = new Graph();
board.knightMoves(startKnight, endKnight);
/* => You made it in 6 moves!  Here's your path:
0,0
1,2
2,4
3,6
5,7
6,5
7,7 */
