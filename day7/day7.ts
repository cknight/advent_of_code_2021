export function costCalcPart1(
  start: number[],
): { cost: number; position: number } {
  let minCost = -1;
  let minPos = 0;
  for (let i = Math.min(...start); i < Math.max(...start); i++) {
    const cost = start.reduce((acc, curr) => acc += Math.abs(curr - i), 0);
    if (minCost === -1 || cost < minCost) {
      minCost = cost;
      minPos = i;
    }
  }
  return { cost: minCost, position: minPos };
}

export function costCalcPart2(
  start: number[],
): { cost: number; position: number } {
  let minCost = -1;
  let minPos = 0;
  const fuelCost = (horizontalMove: number): number =>
    horizontalMove * (horizontalMove + 1) / 2;
  for (let i = Math.min(...start); i < Math.max(...start); i++) {
    const cost = start.reduce(
      (acc, curr) => acc += fuelCost(Math.abs(curr - i)),
      0,
    );
    if (minCost === -1 || cost < minCost) {
      minCost = cost;
      minPos = i;
    }
  }
  return { cost: minCost, position: minPos };
}
