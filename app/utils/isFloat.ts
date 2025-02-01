export const isFloat = (num) => {
  // Check if the number is not an integer
  if (num) return Number(num) === num && num % 1 !== 0;
};
