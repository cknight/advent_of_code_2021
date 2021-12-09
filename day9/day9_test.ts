import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { identifyDrains, lowPointRiskLevelScore } from "./day9.ts";

const testData: string = `2199943210
3987894921
9856789892
8767896789
989996567`;

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(lowPointRiskLevelScore(testData), 15);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(identifyDrains(testData), 1134);
  },
});
