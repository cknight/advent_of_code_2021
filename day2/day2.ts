const day2Inputs: string = await Deno.readTextFile("./day2Input.txt");
const day2InputData = day1Inputs.split('\n');

let forward = 0;
let aim = 0;
let depth = 0;

day2InputData.forEach(element => {
    const parts = element.trim().split(' ');
    if (parts[0] === 'forward') {
        forward += Number(parts[1]);
        depth += Number(parts[1])*aim;
    } else if (parts[0] === 'down') {
        aim += Number(parts[1]);
    } else if (parts[0] === 'up') {
        aim -= Number(parts[1]);
    } else {
        console.log('Unrecognized part:', parts[0]);
    }
});

console.log('Forward:', forward, 'Aim:', aim, 'Depth:', depth, 'Calc:', forward*depth);
