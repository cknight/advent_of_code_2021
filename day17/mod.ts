/*
 *  https://adventofcode.com/2021/day/17
 */

import { part1 } from "./day17.ts";

const day17Input: string = await Deno.readTextFile("./day17Input.txt");

console.log("Part 1:", part1(day17Input).maxY);
console.log("Part 2:", part1(day17Input).velocities);
