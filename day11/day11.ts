const neighbours: number[][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
const increment = (
  grid: number[][],
  flashPoints: number[][],
  row: number,
  col: number,
): number => {
  grid[row][col]++;
  if (grid[row][col] > 9) {
    flashPoints.push([row, col]);
    return 1;
  }
  return 0;
};

export function flashCount(data: string): number {
  let count = 0;

  let grid: number[][] = data.split("\n").map((e) => e.split("").map(Number));
  const inGrid = (row: number, col: number) =>
    grid[row] && typeof grid[row][col] == "number";

  for (let step = 0; step < 100; step++) {
    const flashPoints: number[][] = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        count += increment(grid, flashPoints, row, col);
      }
    }

    while (flashPoints.length) {
      const [row, col] = flashPoints.pop()!;
      neighbours.forEach(([i, j]) => {
        if (inGrid(row + i, col + j) && grid[row + i][col + j] <= 9) {
          count += increment(grid, flashPoints, row + i, col + j);
        }
      });
    }

    grid = grid.map((row) => row.map((el) => el > 9 ? 0 : el));
  }

  return count;
}

export function synchronizePoint(data: string): number {
  let grid: number[][] = data.split("\n").map((e) => e.split("").map(Number));
  const inGrid = (row: number, col: number) =>
    typeof grid[row]?.[col] == "number";
  let lastStep = -1;

  for (let step = 1; lastStep < 0; step++) {
    let flashesInStep = 0;
    const flashPoints: number[][] = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        flashesInStep += increment(grid, flashPoints, row, col);
      }
    }

    while (flashPoints.length) {
      const [row, col] = flashPoints.pop()!;
      neighbours.forEach(([i, j]) => {
        if (inGrid(row + i, col + j) && grid[row + i][col + j] <= 9) {
          flashesInStep += increment(grid, flashPoints, row + i, col + j);
        }
      });
    }

    if (flashesInStep === grid.length * grid[0].length) {
      lastStep = step;
    }
    grid = grid.map((row) => row.map((el) => el > 9 ? 0 : el));
  }

  return lastStep;
}
