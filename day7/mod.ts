/*
 *  https://adventofcode.com/2021/day/7
 */

import { costCalcPart1, costCalcPart2 } from "./day7.ts";

const day7Input: string = await Deno.readTextFile("./day7Input.txt");
const start = day7Input.split(",").map(Number);

console.log("Part 1.  Cost:", costCalcPart1(start));
console.log("Part 2.  Cost:", costCalcPart2(start));
