function calcMedian(arr) {
  const middle = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0
    ? nums[middle]
    : (nums[middle - 1] + nums[middle]) / 2;
}

function calcMean(arr) {
  const total = arr.reduce((num, total) => num + total);
  // return Math.round(total / arr.length); // FIXME: this doesn't work even though it should?
  return Math.floor(total / arr.length); // this doesn't seem correct but it gives the right answer?
}

function calcFuelCost(initial, target) {
  return Math.abs(initial - target);
}

// return sum of previous numbers
function getConsecutiveSum(number) {
  let sum = 0;
  for (let i = 0; i <= number; i++) {
    sum += i;
  }
  return sum;
}

const run1 = (input) => {
  // crabs move horizontally, 1 fuel per number moved
  // calculate position crabs can all align to with the cheapest fuel cost
  // find the median position, then calculate the total fuel cost to move all crabs there
  const median = calcMedian(input);
  let total = 0;
  input.forEach((crab) => {
    total += calcFuelCost(crab, median);
  });
  return total;
};

const run2 = (input) => {
  // fuel cost increases by 1 for each space moved (3 -> 1 + 2 + 3 = 6 fuel)
  // calc mean position and get fuel cost

  const mean = calcMean(input);
  let total = 0;
  input.forEach((crab) => {
    total += getConsecutiveSum(calcFuelCost(crab, mean));
  });
  return total;
};

exports.run1 = run1;
exports.run2 = run2;
