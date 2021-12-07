/*
 *  https://adventofcode.com/2021/day/7
 */

import { costCalcPart1, costCalcPart2 } from "./day7.ts";

const day7Input: string = await Deno.readTextFile("./day7Input.txt");
const start = day7Input.split(",").map(Number);

const part1Outut: { cost: number; position: number } = costCalcPart1(start);
console.log(
  "Part 1.  Cost:",
  part1Outut.cost,
  "Position:",
  part1Outut.position,
);

const part2Outut: { cost: number; position: number } = costCalcPart2(start);
console.log(
  "Part 2.  Cost:",
  part2Outut.cost,
  "Position:",
  part2Outut.position,
);
