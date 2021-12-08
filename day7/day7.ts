export function costCalcPart1(start: number[]): number {
  let minCost = Infinity;
  for (let i = Math.min(...start); i < Math.max(...start); i++) {
    const cost = start.reduce((acc, curr) => acc += Math.abs(curr - i), 0);
    minCost = Math.min(minCost, cost);
  }
  return minCost;
}

export function costCalcPart2(start: number[]): number {
  let minCost = Infinity;
  const fuelCost = (horizontalMove: number): number =>
    horizontalMove * (horizontalMove + 1) / 2;
  for (let i = Math.min(...start); i < Math.max(...start); i++) {
    const cost = start.reduce(
      (acc, curr) => acc += fuelCost(Math.abs(curr - i)),
      0,
    );
    minCost = Math.min(minCost, cost);
  }
  return minCost;
}
