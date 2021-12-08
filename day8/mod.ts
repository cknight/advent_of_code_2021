/*
 *  https://adventofcode.com/2021/day/8
 */

import { fourDigitsSum, hasDigits_1_4_7_8 } from "./day8.ts";

const day8Input: string = await Deno.readTextFile("./day8Input.txt");
const lines = day8Input.split("\n");
const digits: string[][] = day8Input.split("\n").map((e) =>
  e.substr(e.indexOf("| ") + 2).trim().split(" ")
);

console.log("Part 1.  Cost:", hasDigits_1_4_7_8(digits));
console.log("Part 2.  Cost:", fourDigitsSum(lines));
