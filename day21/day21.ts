export function practiceGame(data: string): number {
  const startingPositions = data.split("\n").map((row) => row.split(": ")[1]);
  const player1 = new Player(+startingPositions[0]);
  const player2 = new Player(+startingPositions[1]);
  const state = new GameState(player1, player2);

  while (state.takeTurn());

  return state.gameScore();
}

export function quantumDieGame(data: string): number {
  const startingPositions = data.split("\n").map((row) => row.split(": ")[1]);
  const player1 = new Player(+startingPositions[0]);
  const player2 = new Player(+startingPositions[1]);

  const [p1Wins, p2Wins] = quantumTurn(player1, player2, true, -1, -1, -1);
  return Math.max(p1Wins, p2Wins);
}

const cache: Map<string, number[]> = new Map();

function cacheKey(
  p1: Player,
  p2: Player,
  p1Turn: boolean,
  r1: number,
  r2: number,
  r3: number,
): string {
  return [p1.position, p1.score, p2.position, p2.score, p1Turn, r1, r2, r3]
    .join("_");
}

function quantumTurn(
  p1: Player,
  p2: Player,
  p1Turn: boolean,
  r1: number,
  r2: number,
  r3: number,
): number[] {
  const key = cacheKey(p1, p2, p1Turn, r1, r2, r3);
  let wins = [0, 0];

  if (cache.has(key)) {
    wins = cache.get(key)!;
  } else if (r1 > 0 && r2 > 0 && r3 > 0) {
    // E.g. we have the outcome of all three die rolls
    const player: Player = p1Turn ? p1 : p2;
    player.position += r1 + r2 + r3;
    while (player.position > 10) {
      player.position -= 10;
    }
    player.score += player.position;

    if (player.score >= 21) {
      // E.g. [1, 0] means player 1 wins once, player 2 none
      wins = p1Turn ? [1, 0] : [0, 1];
    } else {
      wins = quantumTurn(p1.clone(), p2.clone(), !p1Turn, -1, -1, -1);
      cache.set(key, wins);
    }
  } else {
    if (r1 < 0) {
      for (let i = 1; i <= 3; i++) {
        const rWins = quantumTurn(p1.clone(), p2.clone(), p1Turn, i, -1, -1);
        wins[0] += rWins[0];
        wins[1] += rWins[1];
      }
    } else if (r2 < 0) {
      for (let i = 1; i <= 3; i++) {
        const rWins = quantumTurn(p1.clone(), p2.clone(), p1Turn, r1, i, -1);
        wins[0] += rWins[0];
        wins[1] += rWins[1];
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        const rWins = quantumTurn(p1.clone(), p2.clone(), p1Turn, r1, r2, i);
        wins[0] += rWins[0];
        wins[1] += rWins[1];
      }
    }
    cache.set(key, wins);
  }
  return wins;
}

class GameState {
  deterministicDie = 1;
  dieRolls = 0;

  player1: Player;
  player2: Player;
  player1Turn = true;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }

  takeTurn(): boolean {
    const roll = this.deterministicDie++ + this.deterministicDie++ +
      this.deterministicDie++;
    this.dieRolls += 3;
    const player: Player = this.player1Turn ? this.player1 : this.player2;

    player.position += roll;
    while (player.position > 10) {
      player.position -= 10;
    }
    player.score += player.position;
    this.player1Turn = !this.player1Turn;
    return player.score < 1000;
  }

  gameScore(): number {
    return Math.min(this.player1.score, this.player2.score) * this.dieRolls;
  }
}

class Player {
  position: number;
  score = 0;

  constructor(pos: number) {
    this.position = pos;
  }

  clone(): Player {
    const clonedPlayer = new Player(this.position);
    clonedPlayer.score = this.score;
    return clonedPlayer;
  }
}
