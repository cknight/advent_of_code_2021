import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { practiceGame, quantumDieGame } from "./day21.ts";
const testData: string = `Player 1 starting position: 4
  Player 2 starting position: 8`;

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(practiceGame(testData), 739785);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(quantumDieGame(testData), 444356092776315);
  },
});
