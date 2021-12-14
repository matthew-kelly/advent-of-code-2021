const run1 = (input) => {
  input = input.map(Number);
  // count numbers that are larger than the previous num
  // skip first
  let count = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) count += 1;
  }
  return count;
};

const run2 = (input) => {
  input = input.map(Number);
  // compare sum of 3 consec. nums to next set (eg. ABC to BCD)
  let count = 0;
  for (let i = 3; i < input.length; i++) {
    if (
      input[i - 2] + input[i - 1] + input[i] >
      input[i - 3] + input[i - 2] + input[i - 1]
    )
      count += 1;
  }
  return count;
};

exports.run1 = run1;
exports.run2 = run2;
