const run1 = (input) => {
  // gamma rate => get most common digit for each position
  // epsilon rate => opposite of gamma

  // get length of list
  const halfLength = Math.floor(input.length / 2);
  // for each digit position, count 1's
  let onesCount = [...Array(input[0].length)].map(x => 0);
  for (let i = 0; i < input.length; i++) {
    input[i].split('').map((num, index) => {
      onesCount[index] = num === "1" ? onesCount[index] += 1 : onesCount[index];
    })
  }
  // if larger than half list length = most common
  let gammaDigits = [];
  let epsilonDigits = [];
  for (let i = 0; i < onesCount.length; i++) {
    gammaDigits[i] = onesCount[i] > halfLength ? "1" : "0";
    epsilonDigits[i] = gammaDigits[i] === "1" ? "0" : "1";
  }
  return parseInt(gammaDigits.join(""), 2) * parseInt(epsilonDigits.join(""), 2);
};

function reduceList(list, targetDigit, type) {
  let ones = [];
  let zeros = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i][targetDigit] === "1") {
      ones.push(list[i]);
    } else {
      zeros.push(list[i]);
    }
  }
  let newList;
  if (type === "o") {
    newList = ones.length >= zeros.length ? ones : zeros;
  } else {
    newList = ones.length >= zeros.length ? zeros : ones;
  }
  if (newList.length === 1) {
    return newList;
  } else {
    return reduceList(newList, targetDigit += 1, type)
  }
}

const run2 = (input) => {
  // calculate most common first digit, filter out non-matching numbers
  // oxygen => keep most common, tie goes to 1
  // C02 => keep least common, tie goes to 0
  // repeat for each digit until only one number remains

  // split list by first digit;
  let ones = [];
  let zeros = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === "1") { 
      ones.push(input[i])
    } else {
      zeros.push(input[i])
    };
  }
  // assign lists to param type
  let oxygenList = ones.length >= zeros.length ? ones : zeros;
  let co2List = oxygenList.length === ones.length ? zeros : ones;
  
  return parseInt(reduceList(oxygenList, 1, "o"), 2) * parseInt(reduceList(co2List, 1, "c"), 2);
};

exports.run1 = run1;
exports.run2 = run2;
