export function polymerization(data: string, iterations: number): number {
  const [template, _, ...pairInsertions] = data.split("\n");
  const rules: Map<string, string> = new Map();
  const charCount: Map<string, number> = new Map();
  let polymers: Map<string, number> = new Map();

  pairInsertions.forEach((p) => {
    const [pair, element] = p.split(" -> ");
    rules.set(pair, element);
  });

  const increment = (
    map: Map<string, number>,
    key: string,
    c: number,
  ): void => {
    map.has(key) ? map.set(key, map.get(key)! + c) : map.set(key, c);
  };

  //initial population
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    increment(polymers, pair, 1);
    increment(charCount, template[i], 1);
  }
  increment(charCount, template[template.length - 1], 1);

  for (let i = 0; i < iterations; i++) {
    const newPolys: Map<string, number> = new Map();
    for (const pair of polymers.keys()) { //e.g. AB (whose rule maps to C)
      increment(newPolys, pair[0] + rules.get(pair), polymers.get(pair)!); //e.g. add new pair AC
      increment(newPolys, rules.get(pair) + pair[1], polymers.get(pair)!); //e.g. add new pair CB
      increment(charCount, rules.get(pair)!, polymers.get(pair)!); //increment C
    }
    polymers = newPolys;
  }

  const max = [...charCount.entries()].reduce((acc, e) =>
    e[1] > acc[1] ? e : acc
  ); //e.g. reduction to biggest entry [a, 2523]
  const min = [...charCount.entries()].reduce((acc, e) =>
    e[1] < acc[1] ? e : acc
  ); //e.g. reduction to smallest entry [b, 833]

  return max[1] - min[1];
}
