import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { part1, part2 } from "./day15.ts";
const testData: string = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(part1(testData), 40);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(part2(testData), 315);
  },
});
