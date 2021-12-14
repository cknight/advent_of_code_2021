/*
 *  https://adventofcode.com/2021/day/13
 */

import { part1, part2 } from "./day13.ts";

const day13Input: string = await Deno.readTextFile("./day13Input.txt");

console.log("Part 1:", part1(day13Input));
part2(day13Input);
