import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
  depthMeasurementIncreases_part1,
  depthMeasurementIncreases_part2,
} from "./day1.ts";

const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(depthMeasurementIncreases_part1(input), 7);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(depthMeasurementIncreases_part2(input), 5);
  },
});
