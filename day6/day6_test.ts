import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { fishCount } from "./day6.ts";

Deno.test({
  name: "Part 1 test",
  fn(): void {
    assertEquals(fishCount([3, 4, 3, 1, 2], 18), 26);
    assertEquals(fishCount([3, 4, 3, 1, 2], 80), 5934);
  },
});

Deno.test({
  name: "Part 2 test",
  fn(): void {
    assertEquals(fishCount([3, 4, 3, 1, 2], 256), 26984457539);
  },
});
