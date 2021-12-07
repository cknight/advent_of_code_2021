export function costCalcPart1(start: number[]): number {
  let minCost = -1;
  for (let i = Math.min(...start); i < Math.max(...start); i++) {
    const cost = start.reduce((acc, curr) => acc += Math.abs(curr - i), 0);
    if (minCost === -1 || cost < minCost) {
      minCost = cost;
    }
  }
  return minCost;
}

export function costCalcPart1_alternative(start: number[]): number {
  
}

export function costCalcPart2(start: number[]): number {
  let minCost = -1;
  const fuelCost = (horizontalMove: number): number =>
    horizontalMove * (horizontalMove + 1) / 2;
  for (let i = Math.min(...start); i < Math.max(...start); i++) {
    const cost = start.reduce(
      (acc, curr) => acc += fuelCost(Math.abs(curr - i)),
      0,
    );
    if (minCost === -1 || cost < minCost) {
      minCost = cost;
    }
  }
  return minCost;
}
