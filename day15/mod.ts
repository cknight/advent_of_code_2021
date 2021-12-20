/*
 *  https://adventofcode.com/2021/day/15
 */

import { part1, part2 } from "./day15.ts";

const day15Input: string = await Deno.readTextFile("./day15Input.txt");

console.log("Part 1:", part1(day15Input));
console.log("Part 2:", part2(day15Input));
