/*
 *  https://adventofcode.com/2021/day/12
 */

import { pathCount_part1, pathCount_part2 } from "./day12.ts";

const day12Input: string = await Deno.readTextFile("./day12Input.txt");

console.log("Part 1:", pathCount_part1(day12Input));
console.log("Part 2:", pathCount_part2(day12Input));
