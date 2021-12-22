const run1 = (input) => {
  // count the number of times [1, 4, 7, 8] appear in the output values
  // output digit w/ length of [2, 3, 4, 7]
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i][1].length; j++) {
      if (
        input[i][1][j].length === 2 ||
        input[i][1][j].length === 3 ||
        input[i][1][j].length === 4 ||
        input[i][1][j].length === 7
      ) {
        count += 1;
      }
    }
  }
  return count;
};

const displayGuide = {
  abcefg: '0',
  cf: '1',
  acdeg: '2',
  acdfg: '3',
  bcdf: '4',
  abdfg: '5',
  abdefg: '6',
  acf: '7',
  abcdefg: '8',
  abcdfg: '9',
};

function decodeLine(pattern, output) {
  pattern = pattern.sort((a, b) => a.length - b.length);
  let decoder = {
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
  };
  // pattern[0] = '1', pattern[2] = '4', pattern[1] = '7', pattern[9] = '8'
  // segments for 1 => decoded 'c' and 'f'
  // unique segment for 7 => decoded 'a'
  // unique segments for 4 => decoded 'b' and 'd'
  const a = getSegmentA(pattern[0], pattern[1]);
  decoder[a] = 'a';
  decoder = getSegmentsBCEF(decoder, pattern);
  // only unknown segment from four is d
  const d = getMissingCharacter(decoder, pattern[2]);
  decoder[d] = 'd';
  // get final segment for g
  const g = getMissingCharacter(decoder, pattern[9]);
  decoder[g] = 'g';

  // calculate output
  let num = '';
  output.forEach((digit) => {
    const decoded = sortAlphabet(
      digit
        .split('')
        .map((original) => decoder[original])
        .join('')
    );
    num += displayGuide[decoded];
  });
  return parseInt(num);
}

function decoderGetUndecodedLetter(decoder, decodedLetter) {
  return Object.keys(decoder).find((key) => decoder[key] === decodedLetter);
}

function getSegmentsBCEF(decoder, pattern) {
  const segmentTally = {
    a: 0, // 8/10 digits
    b: 0, // 6/10 digits
    c: 0, // 8/10 digits
    d: 0, // 7/10 digits
    e: 0, // 4/10 digits
    f: 0, // 9/10 digits
    g: 0, // 7/10 digits
  };
  pattern.forEach((digit) => {
    digit.split('').forEach((character) => {
      // a is already known, skip so c will have unique count
      if (character !== decoderGetUndecodedLetter(decoder, 'a')) {
        segmentTally[character] += 1;
      }
    });
  });
  for (let [character, count] of Object.entries(segmentTally)) {
    switch (count) {
      case 6:
        decoder[character] = 'b';
        break;
      case 8:
        decoder[character] = 'c';
        break;
      case 4:
        decoder[character] = 'e';
        break;
      case 9:
        decoder[character] = 'f';
        break;
    }
  }
  return decoder;
}

function getSegmentA(one, seven) {
  let a;
  seven.split('').forEach((segment) => {
    if (one.indexOf(segment) === -1) {
      a = segment;
    }
  });
  return a;
}

function getMissingCharacter(decoder, number) {
  number = number.split('');
  let missing = number.filter((char) => decoder[char] === '');
  return missing[0];
}

function sortAlphabet(str) {
  let arr = str.split('');
  let sorted = arr.sort();
  return sorted.join('');
}

const run2 = (input) => {
  // get sum of all output values
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const decoded = decodeLine(input[i][0], input[i][1]);
    sum += decoded;
  }
  return sum;
};

exports.run1 = run1;
exports.run2 = run2;
