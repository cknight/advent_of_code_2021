const day3Inputs: string = await Deno.readTextFile("./day3Input.txt");
const day3InputData = day3Inputs.split('\n');

const o = new Array(day3InputData[0].length).fill(0);
const g = new Array(day3InputData[0].length).fill(0);
const e = new Array(day3InputData[0].length).fill(0);

day3InputData.forEach(n => {
    for(let i=0; i < n.length; i++) {
        n[i] === '1' ? o[i]++ : o[i]--;
    }
});

for (let i=0; i < o.length; i++) {
    if (o[i] > 0) {
        g[i] = 1;
        e[i] = 0;
    } else {
        g[i] = 0;
        e[i] = 1;
    }
}
const gamma = parseInt(g.join(''), 2);
const epsilon = parseInt(e.join(''), 2);

//part two
let workingArray = [...day3InputData];
let digitPos = 0;
while(workingArray.length > 1) {
    const c = 0;
    const newWorkingArray = [];
    let count = 0;
    for(let i=0; i < workingArray.length; i++) {
        workingArray[i][digitPos] == '1' ? count++ : count--;
    }
    let matchTo = count < 0 ? '0' : '1';
    for(let i=0; i < workingArray.length; i++) {
        if (workingArray[i][digitPos] == matchTo) {
            newWorkingArray.push(workingArray[i]);
        }
    }
    workingArray = newWorkingArray;
    digitPos++;
}
const og_rating = parseInt(workingArray[0], 2);

workingArray = [...day3InputData];
digitPos = 0;
while(workingArray.length > 1) {
    const c = 0;
    const newWorkingArray = [];
    let count = 0;
    for(let i=0; i < workingArray.length; i++) {
        workingArray[i][digitPos] == '1' ? count++ : count--;
    }
    let matchTo = count < 0 ? '1' : '0';
    for(let i=0; i < workingArray.length; i++) {
        if (workingArray[i][digitPos] == matchTo) {
            newWorkingArray.push(workingArray[i]);
        }
    }
    workingArray = newWorkingArray;
    digitPos++;
}
const co2_rating = parseInt(workingArray[0], 2);
console.log('og_rating: ', og_rating, 'co2_rating', co2_rating, 'multiplied', og_rating * co2_rating);