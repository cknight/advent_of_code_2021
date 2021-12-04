const allInputs: string = await Deno.readTextFile("./day1Input.txt");
const allInputsArray = allInputs.split('\n').map(Number);

let increases = 0;

for (let i=3; i < allInputsArray.length; i++) {
    const aSum = allInputsArray[i-3] + allInputsArray[i-2] + allInputsArray[i-1];
    const bSum = allInputsArray[i-2] + allInputsArray[i-1] + allInputsArray[i];
    if (bSum > aSum) {
        increases++;
    }
    if (i === allInputsArray.length - 1) {
        console.log(aSum, bSum);
    }
}
console.log(increases);