import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { part1, part2 } from "./day13.ts";
const testData: string = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(part1(testData), 17);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    //Assert console output is a string drawing of '0'
    console.log('');
    part2(testData);
  },
});
