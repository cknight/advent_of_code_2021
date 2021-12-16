import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { polymerization } from "./day14.ts";
const testData: string = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(polymerization(testData, 10), 1588);
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(polymerization(testData, 40), 2188189693529);
  },
});
