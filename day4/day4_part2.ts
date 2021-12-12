(async function () {
  const day4Input: string = await Deno.readTextFile("./day4Input.txt");
  const day4Lines: string[] = day4Input.trim().split("\n");
  const bingoNums: string[] = day4Lines[0].trim().split(",");
  const boards: Board[] = [];
  class Board {
    vals: string[][] = [];
    rowMatches: number[] = new Array(5).fill(0);
    columnMatches: number[] = new Array(5).fill(0);

    isWinningBoard = false;

    allVals: string[] = [];

    init(): void {
      this.allVals = this.vals.flat();
    }
  }

  let board: Board = new Board();
  for (let i = 2; i < day4Lines.length; i++) {
    if (day4Lines[i].trim() == "") {
      boards.push(board);
      board = new Board();
    } else {
      board.vals.push(day4Lines[i].trim().split(/\s+/));
    }
  }

  if (board.vals.length !== 0) {
    boards.push(board);
  }

  boards.forEach((e) => e.init());

  let losingBoard: Board | undefined;
  let bingoNumIndex = 0;
  let winningBoards = 0;
  let lastNumber = "";

  exit_loops:
  for (; bingoNumIndex < bingoNums.length; bingoNumIndex++) { //for each bingo number
    for (let j = 0; j < boards.length; j++) { // for each board
      for (
        let x = 0; x < boards[j].vals.length && !boards[j].isWinningBoard; x++
      ) { // for each row
        for (
          let y = 0;
          y < boards[j].vals[x].length && !boards[j].isWinningBoard;
          y++
        ) { // for each column
          if (boards[j].vals[x][y] === bingoNums[bingoNumIndex]) { // board x,y matches bingo number
            // Record row and column match
            boards[j].rowMatches[x]++;
            boards[j].columnMatches[y]++;

            // Remove the value from the board's values
            boards[j].allVals = boards[j].allVals.filter((e) =>
              e !== bingoNums[bingoNumIndex]
            );

            if (
              boards[j].rowMatches[x] == boards[j].vals[y].length ||
              boards[j].columnMatches[y] === boards[j].vals.length
            ) {
              // Either this row or this column has 'won' so this is a winning board
              boards[j].isWinningBoard = true;
              winningBoards++;
              if (winningBoards === boards.length) {
                //This is the last winning board
                losingBoard = boards[j];
                lastNumber = bingoNums[bingoNumIndex];
                break exit_loops;
              }
            }
          }
        }
      }
    }
  }

  const reduceFn = (prev: number, curr: string) => prev + parseInt(curr);
  const reducedVal = losingBoard!.allVals.reduce(reduceFn, 0);
  console.log(lastNumber);
  console.log(reducedVal);
  console.log(parseInt(lastNumber) * reducedVal);
})();
