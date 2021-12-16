/*
 *  https://adventofcode.com/2021/day/14
 */

import { polymerization } from "./day14.ts";

const day14Input: string = await Deno.readTextFile("./day14Input.txt");

console.log("Part 1:", polymerization(day14Input, 10));
console.log("Part 2:", polymerization(day14Input, 40));
