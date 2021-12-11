/*
 *  https://adventofcode.com/2021/day/11
 */

import { flashCount, synchronizePoint } from "./day11.ts";

const day11Input: string = await Deno.readTextFile("./day11Input.txt");

console.log("Part 1:", flashCount(day11Input));
console.log("Part 2:", synchronizePoint(day11Input));
