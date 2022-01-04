export function pixelsInImage(data: string, passes: number): number {
  let [pixelKey, _, ...image] = data.split("\n");

  for (let pass = 0; pass < passes; pass++) {
    let newImage: string[] = []; //e.g. ['..#.##....#', '..###...#', etc]
    for (let row = -1; row < image.length + 1; row++) {
      let newImageRow: string[] = []; //e.g. ['.', '#', '.', '#']
      for (let col = -1; col < image[0].length + 1; col++) {
        let pixelRow = threePixels(pass, pixelKey, row - 1, col, image);
        pixelRow += threePixels(pass, pixelKey, row, col, image);
        pixelRow += threePixels(pass, pixelKey, row + 1, col, image);
        const binary = pixelRow.split(".").join("0").split("#").join("1");
        const newPixel = pixelKey[parseInt(binary, 2)];
        newImageRow.push(newPixel);
      }
      newImage.push(newImageRow.join(""));
    }
    image = newImage;
  }

  return image.reduce((acc, curr) => acc += curr.split("#").length - 1, 0);
}

function threePixels(
  pass: number,
  pixelKey: string,
  row: number,
  col: number,
  image: string[],
): string {
  const voidChar = pixelKey[0];
  const isEvenPass = pass % 2 == 0;
  const isAlternating = voidChar == "#" && pixelKey[511] == ".";
  const one = isEvenPass && isAlternating ? "." : voidChar;
  const two = isEvenPass && isAlternating ? ".." : voidChar.repeat(2);
  const three = isEvenPass && isAlternating ? "..." : voidChar.repeat(3);

  if (row < 0 || row > image.length - 1) {
    return three;
  } else if (col == -1) {
    return two + image[row][0];
  } else if (col == 0) {
    return one + image[row].slice(0, 2);
  } else if (col == image[row].length) {
    return image[row].slice(-1) + two;
  } else if (col == image[row].length - 1) {
    return image[row].slice(-2) + one;
  }
  return image[row].slice(col - 1, col + 2);
}
