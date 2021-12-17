function simulateFish(initial, days) {
  // fish reproduces every 7 days (6 to 0), child is added to end of the array
  // after birth, parent resets to 6 and child is set to 8
  let fishArr = initial;
  for (let i = 0; i < days; i++) {
    let childCount = 0;
    // loop through array, decrement each fish by 1.
    for (let j = 0; j < fishArr.length; j++) {
      if (fishArr[j] > 0) {
        fishArr[j] -= 1;
      } else {
        // If a fish is at 0 pre-decrementing, reset to 6 and add child to children count
        childCount += 1;
        fishArr[j] = 6;
      }
    }
    // after loop is complete, append children (set to 8) to parent array and repeat
    fishArr = fishArr.concat(Array(childCount).fill(8));
    childCount = 0;
  }

  return fishArr.length;
}

function simulateFishV2(initial, days) {
  const counts = Array(9).fill(0); // initialize array for number of each age of fish (0 -> 8)
  initial.forEach((fish) => (counts[fish] += 1)); // populate counts of initial fish
  for (let i = 0; i < days; i++) {
    const breedingFish = counts.shift(); // remove fish at 0 (currently breeding)
    counts[6] += breedingFish; // reset breeding fish to 6
    counts.push(breedingFish); // add children to 8 days count
  }
  return counts.reduce((count, total) => count + total);
}

const run1 = (input) => {
  return simulateFish(input, 80);
};

const run2 = (input) => {
  return simulateFishV2(input, 256);
};

exports.run1 = run1;
exports.run2 = run2;
