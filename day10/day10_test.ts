import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { completeLinesScore, syntaxErrorScore } from "./day10.ts";
const testData: string = `[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`;

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(syntaxErrorScore(testData), 26397);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(completeLinesScore(testData), 288957);
  },
});
