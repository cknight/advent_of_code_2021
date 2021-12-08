const SEGS_1 = 2;
const SEGS_4 = 4;
const SEGS_7 = 3;
const SEGS_8 = 7;
const unique_segs = [SEGS_1, SEGS_4, SEGS_7, SEGS_8];

export function hasDigits_1_4_7_8(digits: string[][]): number {
  return digits.reduce(
    (acc, _, index) =>
      acc += digits[index].filter((e) => unique_segs.includes(e.length)).length,
    0,
  );
}

function overlap(digit: string, pattern: string): number {
  let count = 0;
  for (const d of digit) {
    if (pattern.includes(d)) {
      count++;
    }
  }
  return count;
}

export function fourDigitsSum(signalPatternsToDigits: string[]): number {
  let outputValueSums = 0;

  signalPatternsToDigits.forEach((e) => {
    const [signalPatterns, digits] = e.trim().split(" | ").map((part) =>
      part.split(" ")
    );
    const onePattern: string = signalPatterns.filter((e) => e.length == 2)
      .sort().join("");
    const fourPattern: string = signalPatterns.filter((e) => e.length == 4)
      .sort().join("");
    let num = "";
    digits.forEach((d) => {
      switch (d.length) {
        case 2: {
          num += "1";
          break;
        }
        case 3: {
          num += "7";
          break;
        }
        case 4: {
          num += "4";
          break;
        }
        case 5: {
          if (overlap(d, onePattern) == 2) {
            num += "3";
          } else if (overlap(d, fourPattern) == 3) {
            num += "5";
          } else if (overlap(d, fourPattern) == 2) {
            num += "2";
          } else {
            throw new Error("Unrecognized length 5 pattern");
          }
          break;
        }
        case 6: {
          if (overlap(d, onePattern) == 1) {
            num += "6";
          } else if (overlap(d, fourPattern) == 4) {
            num += "9";
          } else if (overlap(d, fourPattern) == 3) {
            num += "0";
          } else {
            throw new Error("Unrecognized length 6 pattern");
          }
          break;
        }
        case 7: {
          num += "8";
          break;
        }
        default:
          console.log("bad digit: ", "#" + d + "#");
          throw new Error("Not a valid digit");
      }
    });
    outputValueSums += Number(num);
  });

  return outputValueSums;
}
