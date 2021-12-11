import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { flashCount, synchronizePoint } from "./day11.ts";
const testData: string = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(flashCount(testData), 1656);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(synchronizePoint(testData), 195);
  },
});
