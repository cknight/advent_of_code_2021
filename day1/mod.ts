import {
  depthMeasurementIncreases_part1,
  depthMeasurementIncreases_part2,
} from "./day1.ts";

const day1Inputs: string = await Deno.readTextFile("./day1Input.txt");
const inputData = day1Inputs.split("\n").map(Number);

console.log("Part 1", depthMeasurementIncreases_part1(inputData));
console.log("Part 2", depthMeasurementIncreases_part2(inputData));
