/*
 *  https://adventofcode.com/2021/day/6
 */

import { fishCount } from "./day6.ts";

const day6Input: string = await Deno.readTextFile("./day6Input.txt");
let fish:number[] = day6Input.split(',').map(Number);

console.log('Part 1', fishCount(fish, 60));
console.log('Part 2', fishCount(fish, 256));
