/*
 *  https://adventofcode.com/2021/day/16
 */

import { packetProcessor } from "./day16.ts";

const day16Input: string = await Deno.readTextFile("./day16Input.txt");

console.log("Part 1:", packetProcessor(day16Input).versionSum);
console.log("Part 2:", packetProcessor(day16Input).computation);
