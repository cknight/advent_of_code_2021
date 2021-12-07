const day1Inputs: string = await Deno.readTextFile("./day1Input.txt");
const inputData = day1Inputs.split('\n').map(Number);

let increases = 0;

for (let i=3; i < inputData.length; i++) {
    const aSum = inputData[i-3] + inputData[i-2] + inputData[i-1];
    const bSum = inputData[i-2] + inputData[i-1] + inputData[i];
    if (bSum > aSum) {
        increases++;
    }
    if (i === inputData.length - 1) {
        console.log(aSum, bSum);
    }
}
console.log(increases);