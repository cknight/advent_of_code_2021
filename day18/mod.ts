/*
 *  https://adventofcode.com/2021/day/18
 */

import { compute, largestMagnitude } from "./day18.ts";

const day18Input: string = await Deno.readTextFile("./day18Input.txt");
console.log("Part 1:", compute(day18Input));
console.log("Part 2:", largestMagnitude(day18Input));
