const day5Input: string = await Deno.readTextFile("../day5Input.txt");

class Point {
    readonly x: number;
    readonly y: number;
    constructor(x:number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class PointPair {
    point1: Point;
    point2: Point;
    constructor(pointPairStr: string) {
        const points: number[] = pointPairStr.replace(' -> ', ',').split(',').map(Number);
        this.point1 = new Point(points[0], points[1]);
        this.point2 = new Point(points[2], points[3]);
    }

    isHorizontalOrVeritcalLine(): boolean {
        return this.point1.x === this.point2.x || this.point1.y === this.point2.y;
    }

    getHorizontalVerticalLinePointsPath(): Point[] {
        const path: Point[]  = [];
        if (this.point1.x === this.point2.x) {
            const low: Point = this.point1.y < this.point2.y ? this.point1 : this.point2;
            const high: Point = low === this.point1 ? this.point2 : this.point1;
            for (let i=low.y; i <= high.y; i++) {
                path.push(new Point(low.x, i));
            }
        } else if (this.point1.y === this.point2.y) {
            const low: Point = this.point1.x < this.point2.x ? this.point1 : this.point2;
            const high: Point = low === this.point1 ? this.point2 : this.point1;
            for (let i=low.x; i <= high.x; i++) {
                path.push(new Point(i, low.y));
            }
        }
        else {
            console.log('No match', this.point1, this.point2);
        }
        return path;
    }
}

const pointPairs: PointPair[] = day5Input
        .trim()
        .split('\n')
        .map(e => new PointPair(e))
        .filter(e => e.isHorizontalOrVeritcalLine());
const intersections: number[][] = Array.from(Array(1000), _ => Array(1000).fill(0));
pointPairs.forEach(pp => {
    pp.getHorizontalVerticalLinePointsPath().forEach(p => intersections[p.y][p.x]++);
});

const totalIntersections = intersections.reduce((count, intersectionRow) => {
    count += intersectionRow.reduce((rowCount, intersections) => {return intersections > 1 ? ++rowCount : rowCount}, 0);
    return count;
}, 0);

console.log(totalIntersections);
