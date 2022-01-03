const orientations: number[][] = [
  [1, 1, 1],
  [1, 1, -1],
  [1, -1, 1],
  [1, -1, -1],
  [-1, 1, 1],
  [-1, 1, -1],
  [-1, -1, 1],
  [-1, -1, -1],
];
const facings: Map<string, number[]> = new Map([
  ["xyz", [0, 1, 2]],
  ["xzy", [0, 2, 1]],
  ["yxz", [1, 0, 2]],
  ["yzx", [1, 2, 0]],
  ["zxy", [2, 0, 1]],
  ["zyx", [2, 1, 0]],
]);

export function mapBeacons(
  data: string,
): { numberOfBeacons: number; largestManhattenDistance: number } {
  const scanners: Scanner[] = [];
  let coords: number[][] = [];
  let prevScannerId = -1;
  data.split("\n").forEach((line) => {
    if (line.startsWith("---")) {
      if (prevScannerId != -1) {
        scanners.push(new Scanner(prevScannerId, coords));
      }
      coords = [];
      prevScannerId = +line.match(/(\d+)/)![0];
    } else if (line != "") {
      coords.push(line.split(",").map(Number));
    }
  });
  scanners.push(new Scanner(prevScannerId, coords));

  //Fix scanner 0 as a common reference point for all other scanners/beacons
  const fixedOrientation = new Orientation(orientations[0], "xyz");
  scanners[0].orientation = fixedOrientation;

  // Add all scanner 0 beacons to beacon positions set
  const beaconPositions: Set<string> = new Set();
  const scanner0Coors: number[][] = scanners[0].orientationsToCoors.get(
    fixedOrientation.toString(),
  )!;
  scanner0Coors.forEach((c) => beaconPositions.add(c.join(",")));

  const orientatedScanners: Set<Scanner> = new Set([scanners[0]]);

  while (orientatedScanners.size != scanners.length) {
    // For each scanner
    nextScanner:
    for (let i = 1; i < scanners.length; i++) {
      if (scanners[i].orientation) {
        continue;
      }
      const scanner = scanners[i];

      // For each fixed beacon (from all orientated beacons)
      for (const fixedCoor of beaconPositions) {
        const [fixedX, fixedY, fixedZ] = fixedCoor.split(",").map(Number);
        // For each orientation of the scanner
        for (
          const [orientation, coords] of scanner.orientationsToCoors.entries()
        ) {
          // For each beacon of the orientation of the scanner
          for (const floatCoor of coords) {
            // Consider fixed and float beacons to be identical and set relative position of scanner
            const scannerX = fixedX - floatCoor[0];
            const scannerY = fixedY - floatCoor[1];
            const scannerZ = fixedZ - floatCoor[2];

            let matches = 0;
            let coordsChecked = 0;
            const thisOrientationRelativeCoors: number[][] = [];
            // Loop through each beacon of this orientation of scanner and find matches
            for (const coor of coords) {
              const relCoor: number[] = [
                coor[0] + scannerX,
                coor[1] + scannerY,
                coor[2] + scannerZ,
              ];
              thisOrientationRelativeCoors.push(relCoor);

              if (beaconPositions.has(relCoor.join(","))) {
                matches++;
              } else if (++coordsChecked > coords.length - 12 + matches) {
                // can stop checking if we can't hit the 12 matched beacons mark
                break;
              }
            }

            if (matches > 11) {
              thisOrientationRelativeCoors.forEach((c) =>
                beaconPositions.add(c.join(","))
              );
              scanner.relativePosition = [scannerX, scannerY, scannerZ];
              scanner.orientation = orientationFromString(orientation);
              orientatedScanners.add(scanner);
              continue nextScanner;
            }
          }
        }
      }
    }
  }
  return {
    numberOfBeacons: beaconPositions.size,
    largestManhattenDistance: calculateLargestManhattenDistance(scanners),
  };
}

function calculateLargestManhattenDistance(scanners: Scanner[]): number {
  let maxManhattenDistance = -Infinity;
  for (let i = 0; i < scanners.length - 1; i++) {
    for (let j = i + 1; j < scanners.length; j++) {
      const diffX = Math.abs(
        scanners[i].relativePosition[0] - scanners[j].relativePosition[0],
      );
      const diffY = Math.abs(
        scanners[i].relativePosition[1] - scanners[j].relativePosition[1],
      );
      const diffZ = Math.abs(
        scanners[i].relativePosition[2] - scanners[j].relativePosition[2],
      );
      const md = diffX + diffY + diffZ;
      if (md > maxManhattenDistance) {
        maxManhattenDistance = md;
      }
    }
  }
  return maxManhattenDistance;
}

class Scanner {
  id: number;
  orientationsToCoors: Map<string, number[][]> = new Map();
  orientation: Orientation | undefined;
  relativePosition: number[] = [];

  constructor(id: number, coords: number[][]) {
    this.id = id;
    this.createOrientations(coords);
  }

  private createOrientations(coords: number[][]): void {
    orientations.forEach((o) => {
      for (const facing of facings.entries()) {
        this.handleFacing(facing[1], o, coords, facing[0]);
      }
    });
  }

  private handleFacing(
    indexes: number[],
    oFactor: number[],
    coords: number[][],
    facing: string,
  ): void {
    const oCoords: number[][] = [];

    coords.forEach((c) => {
      // e.g. rearrange coordinate [52, -35, 166] for facing, then multiply by orientation [1, -1, -1]
      const facingCoord = [c[indexes[0]], c[indexes[1]], c[indexes[2]]];
      oCoords.push(facingCoord.map((e, idx) => e * oFactor[idx]));
    });
    this.orientationsToCoors.set(
      new Orientation(oFactor, facing).toString(),
      oCoords,
    );
  }
}

class Orientation {
  directions: number[];
  xyzOrder: string;

  constructor(directions: number[], xyzOrder: string) {
    this.directions = directions;
    this.xyzOrder = xyzOrder;
  }

  toString(): string {
    return this.directions.join(",") + "," + this.xyzOrder;
  }
}

function orientationFromString(orString: string): Orientation {
  const parts = orString.split(","); // [x,y,z,xyz]
  return new Orientation(parts.slice(0, 3).map(Number), "" + parts[4]);
}
