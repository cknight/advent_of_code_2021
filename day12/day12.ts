function buildPathMap(data: string): Map<string, string[]> {
  const pathMap: Map<string, string[]> = new Map();
  const pairs: string[][] = data.split("\n").map((e) => e.split("-"));
  pairs.forEach(([a, b]) => {
    pathMap.get(a) ? pathMap.get(a)!.push(b) : pathMap.set(a, [b]);
    pathMap.get(b) ? pathMap.get(b)!.push(a) : pathMap.set(b, [a]);
  });

  return pathMap;
}

export function pathCount_part1(data: string): number {
  const pathMap = buildPathMap(data);

  const walk = (visited: Set<string>, node: string): string[][] => {
    if (node == node.toLowerCase() && visited.has(node)) {
      return [];
    } else if (node === "end") {
      return [["end"]];
    }

    const paths: string[][] = [];

    pathMap.get(node)?.forEach((neighbor) => {
      const newVisited: Set<string> = new Set(visited);
      newVisited.add(node);
      const neighborPaths: string[][] = walk(newVisited, neighbor);
      neighborPaths.forEach((p) => {
        if (p[p.length - 1] === "end") {
          paths.push([node].concat(p));
        }
      });
    });
    return paths;
  };

  return walk(new Set(), "start").length;
}

export function pathCount_part2(data: string): number {
  const pathMap = buildPathMap(data);

  const walk = (
    seen: Set<string>,
    node: string,
    seenTwoSmall: boolean,
  ): string[][] => {
    if (node === "end") {
      return [["end"]];
    } else if (node === "start" && seen.has("start")) {
      return [];
    } else if (node === node.toLowerCase() && seen.has(node) && seenTwoSmall) {
      return [];
    }

    if (node === node.toLowerCase() && seen.has(node)) {
      seenTwoSmall = true;
    }

    const paths: string[][] = [];

    pathMap.get(node)?.forEach((neighbor) => {
      const newVisited: Set<string> = new Set(seen);
      newVisited.add(node);
      const neighborPaths: string[][] = walk(
        newVisited,
        neighbor,
        seenTwoSmall,
      );
      neighborPaths.forEach((p) => {
        if (p[p.length - 1] === "end") {
          paths.push([node].concat(p));
        }
      });
    });
    return paths;
  };

  return walk(new Set(), "start", false).length;
}
