const nodeKey = (row: number, col: number) => "" + row + "," + col;
class Node {
  riskLevel = 0;
  distCost = Infinity;
  neighbors: string[] = [];
  constructor(grid: number[][], row: number, col: number) {
    this.riskLevel = grid[row][col];
    this.distCost = row == 0 && col == 0 ? 0 : Infinity;
    this.addNeighbor(grid, row + 1, col);
    this.addNeighbor(grid, row - 1, col);
    this.addNeighbor(grid, row, col + 1);
    this.addNeighbor(grid, row, col - 1);
  }

  private addNeighbor(grid: number[][], row: number, col: number) {
    if (grid[row] && grid[row][col] != undefined) {
      this.neighbors.push(nodeKey(row, col));
    }
  }
}

export function part1(data: string): number {
  const grid: number[][] = data.split("\n").map((e) => e.split("").map(Number));
  return dikjstraShortestPath(grid);
}

export function part2(data: string): number {
  const grid: number[][] = data.split("\n").map((e) => e.split("").map(Number));
  const subGrids: number[][][] = [[], [], [], [], []];
  grid.forEach((row) => {
    let newRow: number[] = [];
    for (let i = 0; i < 5; i++) {
      newRow = newRow.concat(row.map((e) => e + i > 9 ? e + i - 9 : e + i));
    }
    for (let i = 0; i < 5; i++) {
      subGrids[i].push(newRow.map((e) => e + i > 9 ? e + i - 9 : e + i));
    }
  });
  const fullGrid = subGrids.reduce((acc, curr) => acc.concat(curr));

  return dikjstraShortestPath(fullGrid);
}

function dikjstraShortestPath(grid: number[][]): number {
  const unvisited: Map<string, Node> = new Map();
  const visited: Map<string, Node> = new Map();

  unvisited.set(nodeKey(0, 0), new Node(grid, 0, 0));

  while (true) {
    let minEntry: [string, Node] | undefined = undefined;
    for (const entry of unvisited.entries()) {
      if (entry[1].distCost < (minEntry ? minEntry[1].distCost : Infinity)) {
        minEntry = entry;
      }
    }
    const [key, minNode] = minEntry!;

    if (key == nodeKey(grid.length - 1, grid[0].length - 1)) {
      // Found shortest path as we are at the end node
      return minNode.distCost;
    }

    visited.set(key, minNode);
    unvisited.delete(key);

    minNode.neighbors.forEach((n) => {
      if (!visited.has(n)) {
        if (!unvisited.has(n)) {
          const [row, col] = n.split(",").map(Number);
          unvisited.set(n, new Node(grid, row, col));
        }
        const cost = minNode.distCost + unvisited.get(n)!.riskLevel;
        if (cost < unvisited.get(n)!.distCost) {
          unvisited.get(n)!.distCost = cost;
        }
      }
    });
  }
}
