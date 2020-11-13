export const ruSyntaxHelper = (count: number) => {
  const countArray = count.toString().split('');

  const firstNumber = Number(countArray[0]);
  const secondNumber = Number(countArray[1]);
  const thirdNumber = Number(countArray[2]);

  if (countArray.length === 3) {
    return thirdNumber === 1 && secondNumber !== 1
      ? 'single'
      : thirdNumber <= 4 && secondNumber !== 1 && thirdNumber !== 0
      ? 'singlePlural'
      : 'plural';
  }

  if (countArray.length === 2) {
    return secondNumber === 1 && firstNumber !== 1
      ? 'single'
      : secondNumber <= 4 && firstNumber !== 1 && secondNumber !== 0
      ? 'singlePlural'
      : 'plural';
  }

  return firstNumber === 1
    ? 'single'
    : firstNumber <= 4 && firstNumber !== 0
    ? 'singlePlural'
    : 'plural';
};
