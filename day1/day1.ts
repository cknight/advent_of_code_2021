export function depthMeasurementIncreases_part1(inputData: number[]): number {
  return inputData.reduce(
    (acc, _, currentIndex) =>
      currentIndex != 0 && inputData[currentIndex] > inputData[currentIndex - 1]
        ? ++acc
        : acc,
    0,
  );
}

export function depthMeasurementIncreases_part2(inputData: number[]): number {
  let increases = 0;

  for (let i = 3; i < inputData.length; i++) {
    const aSum = inputData[i - 3] + inputData[i - 2] + inputData[i - 1];
    const bSum = inputData[i - 2] + inputData[i - 1] + inputData[i];
    if (bSum > aSum) {
      increases++;
    }
  }
  return increases;
}
