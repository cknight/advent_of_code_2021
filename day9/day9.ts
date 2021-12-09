export function lowPointRiskLevelScore(input: string): number {
  const heights: number[][] = input.split("\n").map((e) =>
    e.split("").map(Number)
  );
  const lows: number[] = [];

  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights[0].length; j++) {
      let readings: number[] = [];
      const currentReading = heights[i][j];

      readings.push(currentReading); // the element
      if (i > 0) readings.push(heights[i - 1][j]); // above
      if (i < heights.length - 1) readings.push(heights[i + 1][j]); // underneath
      if (j > 0) readings.push(heights[i][j - 1]); // to the left
      if (j < heights[0].length - 1) readings.push(heights[i][j + 1]); // to the right

      // Doesn't count if an adjacent member is the same value as current reading, so account for that
      if (
        readings.filter((e) => e === currentReading).length == 1 &&
        Math.min(...readings) === currentReading
      ) {
        lows.push(currentReading);
      }
    }
  }

  return lows.reduce((acc, curr) => acc + curr + 1, 0);
}

const nodesVisited: Set<string> = new Set();
const node = (i: number, j: number): string => i + "," + j;

export function identifyDrains(input: string): number {
  const heights: number[][] = input.split("\n").map((e) =>
    e.split("").map(Number)
  );
  const drains: number[][] = [];
  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights[0].length; j++) {
      if (!nodesVisited.has(node(i, j)) && heights[i][j] != 9) {
        const drain = followDrain(heights, i, j, []);
        drains.push(drain);
      }
    }
  }
  const answer = drains
    .sort((l, r) => l.length > r.length ? 1 : -1)
    .slice(-3)
    .reduce((acc, curr) => acc * curr.length, 1);
  return answer;
}

function followDrain(
  heights: number[][],
  i: number,
  j: number,
  drain: number[],
): number[] {
  if (
    i < 0 ||
    i > heights.length - 1 ||
    j < 0 ||
    j > heights[0].length - 1 ||
    nodesVisited.has(node(i, j)) ||
    heights[i][j] == 9
  ) {
    return drain;
  }
  drain.push(heights[i][j]);
  nodesVisited.add(node(i, j));

  drain = followDrain(heights, i + 1, j, drain);
  drain = followDrain(heights, i, j + 1, drain);
  drain = followDrain(heights, i - 1, j, drain);
  drain = followDrain(heights, i, j - 1, drain);

  return drain;
}
