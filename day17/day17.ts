export function part1(data: string): { maxY: number; velocities: number } {
  const [xmin, xmax] = data.split("x=")[1].split(",")[0].split("..").map(
    Number,
  );
  const [ymin, ymax] = data.split("y=")[1].split("..").map(Number);

  const inTarget = (x: number, y: number): boolean => {
    return x >= xmin && x <= xmax && y >= ymin && y <= ymax;
  };

  let overallMaxY = -Infinity;

  // Returns true if target hit at least once
  const runSteps = (x: number, y: number, dx: number, dy: number): boolean => {
    let maxY = -Infinity;
    let foundTarget = false;
    while (x <= xmax && y >= ymin) {
      if (inTarget(x, y)) {
        overallMaxY = Math.max(overallMaxY, y);
        if (maxY > overallMaxY) {
          overallMaxY = Math.max(overallMaxY, maxY);
        }
        foundTarget = true;
      }
      dx = dx - 1 < 0 ? 0 : dx - 1;
      dy = dy - 1;
      x += dx;
      y += dy;
      maxY = Math.max(maxY, y);
    }
    return foundTarget;
  };

  let targetHits: string[] = [];

  for (let dx = 1; dx <= xmax; dx++) {
    for (let dy = ymin; dy <= Math.abs(ymin); dy++) {
      if (runSteps(0, 0, dx + 1, dy + 1)) {
        targetHits.push("" + dx + "," + dy);
      }
    }
  }

  return { maxY: overallMaxY, velocities: new Set(targetHits).size };
}
