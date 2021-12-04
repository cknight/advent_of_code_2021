const allInputs: string = await Deno.readTextFile("./day2Input.txt");
const allInputsArray = allInputs.split('\n');

let f = 0;
let aim = 0;
let d = 0;

allInputsArray.forEach(element => {
    const parts = element.trim().split(' ');
    if (parts[0] === 'forward') {
        f += Number(parts[1]);
        d += Number(parts[1])*aim;
    } else if (parts[0] === 'down') {
        aim += Number(parts[1]);
    } else if (parts[0] === 'up') {
        aim -= Number(parts[1]);
    } else {
        console.log('Unrecognized part:', parts[0]);
    }
});

console.log('Forward:', f, 'Aim:', aim, 'Depth:', d, 'Calc:', f*d);
