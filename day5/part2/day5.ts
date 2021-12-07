const day5Input: string = await Deno.readTextFile("../day5Input.txt");

type Point = Readonly<{
  x: number;
  y: number;
}>;

class PointPair {
  point1: Point;
  point2: Point;
  constructor(pointPairStr: string) {
    const points: number[] = pointPairStr.replace(" -> ", ",").split(",").map(
      Number,
    );
    this.point1 = { x: points[0], y: points[1] };
    this.point2 = { x: points[2], y: points[3] };
  }

  getPointsPath(): Point[] {
    const path: Point[] = [];
    const xDiff = this.point2.x - this.point1.x;
    const yDiff = this.point2.y - this.point1.y;
    const xSign = Math.sign(xDiff);
    const ySign = Math.sign(yDiff);
    for (let i = 0; i <= Math.max(Math.abs(xDiff), Math.abs(yDiff)); i++) {
      path.push({ x: this.point1.x + xSign * i, y: this.point1.y + ySign * i });
    }

    return path;
  }
}

const pointPairs: PointPair[] = day5Input
  .trim()
  .split("\n")
  .map((e) => new PointPair(e));

const intersections: number[][] = Array.from(
  Array(1000),
  (_) => Array(1000).fill(0),
);

pointPairs.forEach((pp) => {
  pp.getPointsPath().forEach((p) => intersections[p.y][p.x]++);
});

const totalIntersections = intersections.reduce((count, intersectionRow) => {
  return count +
    intersectionRow.reduce(
      (rowCount, intersections) => intersections > 1 ? ++rowCount : rowCount,
      0,
    );
}, 0);

console.log(totalIntersections);
