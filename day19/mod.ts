/*
 *  https://adventofcode.com/2021/day/19
 */

import { mapBeacons } from "./day19.ts";

const day19Input: string = await Deno.readTextFile("./day19Input.txt");

const start = new Date().getTime();
const result = mapBeacons(day19Input);
console.log("Part 1:", result.numberOfBeacons);
console.log("Part 2:", result.largestManhattenDistance);
console.log("Processed in", new Date().getTime() - start, "ms");
