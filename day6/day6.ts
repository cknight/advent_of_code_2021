export function fishCount(fish: number[], days: number): number {
  let fishIndex = new Array(9).fill(0);
  fish.forEach((e) => fishIndex[e]++);
  for (let i = 0; i < days; i++) {
    const day0Fish = fishIndex.shift();
    fishIndex[6] += day0Fish;
    fishIndex[8] = day0Fish;
  }
  return fishIndex.reduce((acc, curr) => acc + curr);
}
