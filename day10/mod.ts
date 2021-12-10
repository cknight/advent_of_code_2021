/*
 *  https://adventofcode.com/2021/day/10
 */

import { completeLinesScore, syntaxErrorScore } from "./day10.ts";

const day10Input: string = await Deno.readTextFile("./day10Input.txt");

console.log("Part 1:", syntaxErrorScore(day10Input));
console.log("Part 2:", completeLinesScore(day10Input));
