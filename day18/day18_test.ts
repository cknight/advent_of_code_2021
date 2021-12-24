import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
  computeMagnitude,
  computeSums,
  largestMagnitude,
  reduceExplosions,
  reduceFirstSplit,
} from "./day18.ts";
const testData1: string = `[1,1]
[2,2]
[3,3]
[4,4]`;

const testData2: string = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`;

const testData3: string = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`;

const testData4: string = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`;

const testData5: string = `[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`;

const testData6: string = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

const testData7: string = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

Deno.test({
  name: "Part 1 test - Explosion",
  fn() {
    assertEquals(
      reduceExplosions("[[[[[9,8],1],2],3],4]"),
      "[[[[0,9],2],3],4]",
    );
    assertEquals(
      reduceExplosions("[7,[6,[5,[4,[3,2]]]]]"),
      "[7,[6,[5,[7,0]]]]",
    );
    assertEquals(
      reduceExplosions("[[6,[5,[4,[3,2]]]],1]"),
      "[[6,[5,[7,0]]],3]",
    );
    assertEquals(
      reduceExplosions("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]"),
      "[[3,[2,[8,0]]],[9,[5,[7,0]]]]",
    );
    assertEquals(
      reduceExplosions("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]"),
      "[[3,[2,[8,0]]],[9,[5,[7,0]]]]",
    );
  },
});

Deno.test({
  name: "Part 1 test - Splits",
  fn() {
    assertEquals(
      reduceFirstSplit("[[[[0,7],4],[15,[0,13]]],[1,1]]"),
      "[[[[0,7],4],[[7,8],[0,13]]],[1,1]]",
    );
  },
});

Deno.test({
  name: "Part 1 test - Compute sums",
  fn() {
    assertEquals(computeSums(testData1), "[[[[1,1],[2,2]],[3,3]],[4,4]]");
    assertEquals(computeSums(testData2), "[[[[3,0],[5,3]],[4,4]],[5,5]]");
    assertEquals(computeSums(testData3), "[[[[5,0],[7,4]],[5,5]],[6,6]]");
    assertEquals(
      computeSums(testData4),
      "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]",
    );
    assertEquals(computeSums(testData5), "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");
    assertEquals(
      computeSums(testData6),
      "[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]",
    );
  },
});

Deno.test({
  name: "Part 1 test - Compute magnitude",
  fn() {
    assertEquals(computeMagnitude("[[1,2],[[3,4],5]]"), 143);
    assertEquals(computeMagnitude("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]"), 1384);
    assertEquals(computeMagnitude("[[[[1,1],[2,2]],[3,3]],[4,4]]"), 445);
    assertEquals(computeMagnitude("[[[[3,0],[5,3]],[4,4]],[5,5]]"), 791);
    assertEquals(computeMagnitude("[[[[5,0],[7,4]],[5,5]],[6,6]]"), 1137);
    assertEquals(
      computeMagnitude("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]"),
      3488,
    );
  },
});

Deno.test({
  name: "Part 2 test - largeset magnitude",
  fn() {
    assertEquals(largestMagnitude(testData7), 3993);
  },
});
