const day4Input: string = await Deno.readTextFile("./day4Input.txt");
const day4Lines: string[] = day4Input.trim().split('\n');

const bingoNums: string[] = day4Lines[0].trim().split(',');
const boards: Board[] = [];
class Board {
    vals: string[][] = [];
    rowMatches: number[] = new Array(5).fill(0);
    columnMatches: number[] = new Array(5).fill(0);

    allVals: string[] = [];

    init(): void {
        this.allVals = this.vals.flat();
    }
}

let board: Board = new Board();
for (let i=2; i < day4Lines.length; i++) {
    if (day4Lines[i] == '') {
        boards.push(board);
        board = new Board();
    } else {
        board.vals.push(day4Lines[i].trim().split(/\s+/));
    }
}

if (board.vals.length !== 0) {
    boards.push(board);
}

boards.forEach(e => e.init());

let winningBoard: Board|null = null;
let winningNumber = '';

for (let bingoNumIndex = 0;bingoNumIndex < bingoNums.length && !winningBoard; bingoNumIndex++) { // for each Bingo numbers
    for(let j=0; j < boards.length && !winningBoard; j++) { // for each board
        for (let x=0; x < boards[j].vals.length && !winningBoard; x++) { // for each row
            for (let y=0; y < boards[j].vals[x].length && !winningBoard; y++) { // for each column
                if (boards[j].vals[x][y] === bingoNums[bingoNumIndex]) {
                    // board x,y matches bingo number, record hit in column and row
                    boards[j].rowMatches[x]++;
                    boards[j].columnMatches[y]++;

                    // remove value from bingo board
                    boards[j].allVals = boards[j].allVals.filter(e => e !== bingoNums[bingoNumIndex]);

                    if (boards[j].rowMatches[x] == boards[j].vals[y].length || boards[j].columnMatches[y] === boards[j].vals.length) {
                        // either row or column has all matches.  this is a winning board
                        winningBoard = boards[j];
                        winningNumber = bingoNums[bingoNumIndex];
                    }
                }
            }
        }
    }
}


const reduceFn = (prev: number, curr: string) => prev + parseInt(curr);
const reducedVal = winningBoard!.allVals.reduce(reduceFn, 0);
console.log(winningNumber);
console.log(reducedVal);
console.log((parseInt(winningNumber) * reducedVal));