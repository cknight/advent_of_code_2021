export function reduceExplosions(data: string): string {
  let foundExplosion = false;
  do {
    foundExplosion = false;
    let depth = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] == "[") {
        depth++;
      } else if (data[i] == "]") {
        depth--;
      } else if (data[i] >= "0" && data[i] <= "9") {
        if (depth > 4 && /^\d+,\d+.*/.test(data.substr(i))) {
          foundExplosion = true;
          const [_grp, x, y] = data.substr(i).match(/(\d+),(\d+).*/)!;
          const pair = "[" + x + "," + y + "]";

          //forwards scan until next number (if any), add y
          for (let j = i + pair.length; j < data.length; j++) {
            if (data[j] >= "0" && data[j] <= "9") {
              const right = data.substr(j).match(/(\d+).*/)![1];
              data = data.substr(0, j) + (+right + +y) +
                data.substr(j + right.length);
              break;
            }
          }

          //replace [x,y] with 0
          data = data.substr(0, i - 1) + "0" + data.substr(i - 1 + pair.length);

          //backwards scan until previous number (if any), add x
          for (let j = i - 2; j >= 0; j--) {
            if (data[j] >= "0" && data[j] <= "9") {
              const left = data.substr(0, j + 1).match(/(\d+)$/)![1];
              data = data.substr(0, j - (left.length - 1)) + (+left + +x) +
                data.substr(j + 1);
              break;
            }
          }
          break; //skip rest of line, start again from beginning
        }
      }
    }
  } while (foundExplosion);
  return data;
}

export function reduceFirstSplit(data: string): string {
  for (let i = 0; i < data.length; i++) {
    if (data[i] >= "0" && data[i] <= "9") {
      const num = data.substr(i).match(/(\d+).*/)![1];
      if (+num > 9) {
        const pair = "[" + Math.floor(+num / 2) + "," + Math.ceil(+num / 2) +
          "]";
        return data.substr(0, i) + pair + data.substr(i + num.length);
      }
    }
  }

  return data;
}

export function computeSums(data: string): string {
  const nums: string[] = data.split("\n");
  let procesedData = nums[0];

  for (let i = 1; i < nums.length; i++) {
    procesedData = "[" + procesedData + "," + nums[i] + "]";
    let startData = "";
    while (startData != procesedData) {
      startData = procesedData;
      procesedData = reduceExplosions(startData);
      procesedData = reduceFirstSplit(procesedData);
    }
  }

  return procesedData;
}

export function computeMagnitude(data: string): number {
  while (data[0] == "[") {
    data = data.replace(
      /\[(\d+),(\d+)\]/g,
      (_, d1: string, d2: string): string => {
        return "" + (3 * (+d1) + 2 * (+d2));
      },
    );
  }
  return +data;
}

export function compute(data: string): number {
  return computeMagnitude(computeSums(data));
}

export function largestMagnitude(data: string): number {
  let largestMagnitude = -Infinity;
  const nums: string[] = data.split("\n");
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i != j) {
        const newData = nums[i] + "\n" + nums[j];
        largestMagnitude = Math.max(largestMagnitude, compute(newData));
      }
    }
  }
  return largestMagnitude;
}
