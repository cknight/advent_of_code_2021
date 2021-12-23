import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { part1 } from "./day17.ts";
const testData: string = `target area: x=20..30, y=-10..-5`;

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(part1(testData).maxY, 45);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(part1(testData).velocities, 112);
  },
});
