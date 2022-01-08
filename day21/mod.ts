/*
 *  https://adventofcode.com/2021/day/21
 */

import { practiceGame, quantumDieGame } from "./day21.ts";

const day21Input: string = await Deno.readTextFile("./day21Input.txt");

console.log("Part 1:", practiceGame(day21Input));
console.log("Part 2:", quantumDieGame(day21Input));
