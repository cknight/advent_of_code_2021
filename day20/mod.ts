/*
 *  https://adventofcode.com/2021/day/20
 */

import { pixelsInImage } from "./day20.ts";

const day20Input: string = await Deno.readTextFile("./day20Input.txt");

console.log("Part 1:", pixelsInImage(day20Input, 2));
console.log("Part 2:", pixelsInImage(day20Input, 50));
