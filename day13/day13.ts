function computeDotsPerFold(data: string): number[][][] {
  let dotsPerFold: number[][][] = [];

  let dotCoordinates: number[][] = [];
  const foldInstructions: string[][] = [];

  data.split("\n").forEach((e) => {
    if (/^[0-9].*/.test(e)) {
      dotCoordinates.push(e.split(",").map(Number));
    } else if (/^fold.*/.test(e)) {
      foldInstructions.push(e.substr("fold along ".length).split("="));
    }
  });

  foldInstructions.forEach(([xy, rowCol]) => {
    let newDotCoords: number[][] = [];
    const length = +rowCol * 2;
    dotCoordinates.forEach(([col, row]) => {
      if (xy == "x" && col > +rowCol) {
        newDotCoords.push([length - col, row]);
      } else if (xy == "y" && row > +rowCol) {
        newDotCoords.push([col, length - row]);
      } else {
        newDotCoords.push([col, row]);
      }
    });
    dotCoordinates = newDotCoords;
    dotsPerFold.push(dotCoordinates);
  });

  return dotsPerFold;
}

export function part1(data: string): number {
  const dotsPerFold = computeDotsPerFold(data);

  const uniquePoints: Set<string> = new Set();
  dotsPerFold[0].forEach(([col, row]) => {
    uniquePoints.add(col + "," + row);
  });

  return uniquePoints.size;
}

export function part2(data: string): void {
  const dotsPerFold = computeDotsPerFold(data);
  const coorMap: Map<number, number[]> = new Map();

  dotsPerFold[dotsPerFold.length - 1].forEach(([col, row]) => {
    coorMap.has(col) ? coorMap.get(col)!.push(row) : coorMap.set(col, [row]);
  });
  for (const [k, v] of coorMap.entries()) {
    coorMap.set(k, v);
  }

  for (let j = 0; j < 10; j++) {
    let line = "";
    for (let i = 0; i < 100; i++) {
      line += coorMap.has(i) && coorMap.get(i)?.includes(j) ? "X" : " ";
    }
    console.log(line);
  }
}
