import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { costCalcPart1, costCalcPart2 } from "./day7.ts";

Deno.test({
  name: "Part 1 test",
  fn(): void {
    assertEquals(costCalcPart1([16, 1, 2, 0, 4, 2, 7, 1, 2, 14]).cost, 37);
  },
});

Deno.test({
  name: "Part 2 test",
  fn(): void {
    assertEquals(costCalcPart2([16, 1, 2, 0, 4, 2, 7, 1, 2, 14]).cost, 168);
  },
});
