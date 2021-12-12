import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { pathCount_part1, pathCount_part2 } from "./day12.ts";
const testData: string = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(pathCount_part1(testData), 10);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(pathCount_part2(testData), 36);
  },
});
