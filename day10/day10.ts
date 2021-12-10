const closeToOpen = new Map([["]", "["], ["}", "{"], [")", "("], [">", "<"]]);
const openToClose = new Map([["[", "]"], ["{", "}"], ["(", ")"], ["<", ">"]]);
const errorScores = new Map([["]", 57], ["}", 1197], [")", 3], [">", 25137]]);
const isStart = (c: string): boolean => openToClose.has(c);
const isEnd = (c: string): boolean => closeToOpen.has(c);

function processLine(
  line: string,
  stack: string[],
): { errorScore: number; isIncomplete: boolean } {
  for (const char of line.split("")) {
    if (isStart(char)) {
      stack.push(char);
    } else if (isEnd(char) && closeToOpen.get(char) !== stack.pop()) {
      return { errorScore: errorScores.get(char)!, isIncomplete: false };
    }
  }
  return { errorScore: 0, isIncomplete: true };
}

export function syntaxErrorScore(data: string): number {
  let score = 0;

  data.split("\n").forEach((line) => {
    const stack: string[] = [];
    score += processLine(line, stack).errorScore;
  });

  return score;
}

export function completeLinesScore(data: string): number {
  const scores = new Map([["[", 2], ["{", 3], ["(", 1], ["<", 4]]);
  let totals: number[] = [];

  data.split("\n").forEach((line) => {
    const stack: string[] = [];
    if (processLine(line, stack).isIncomplete) {
      const score = stack.reduceRight(
        (acc, curr) => acc * 5 + scores.get(curr)!,
        0,
      );
      totals.push(score);
    }
  });

  return totals.sort((a, b) => a - b)[Math.floor(totals.length / 2)];
}
