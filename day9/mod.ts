/*
 *  https://adventofcode.com/2021/day/9
 */

import { identifyDrains, lowPointRiskLevelScore } from "./day9.ts";

const day9Input: string = await Deno.readTextFile("./day9Input.txt");

console.log("Part 1:", lowPointRiskLevelScore(day9Input));
console.log("Part 2:", identifyDrains(day9Input));
