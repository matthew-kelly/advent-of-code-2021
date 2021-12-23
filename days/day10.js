const pairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
const openings = Object.keys(pairs);

const errorPointsTable = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const run1 = (input) => {
  // each row has one or more chunks, each chunk includes zero or more chunks
  // count error score
  const syntaxErrors = {};
  chunksLoop: for (const row of input) {
    let opened = [];
    for (const bracket of row) {
      // is opening bracket -> add to currently opened
      if (openings.includes(bracket)) {
        opened.push(bracket);
      } else if (pairs[opened.pop()] !== bracket) {
        // current closing bracket does not close current block -> error
        syntaxErrors[bracket] = syntaxErrors[bracket] + 1 || 1; // add to error list
        continue chunksLoop; // skip current row
      }
    }
  }
  let syntaxErrorScore = 0;
  for (const [bracket, number] of Object.entries(syntaxErrors)) {
    syntaxErrorScore += errorPointsTable[bracket] * number;
  }

  return syntaxErrorScore;
};

const completedPointsTable = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const run2 = (input) => {
  // return completion score -> score for each closing bracket needed in a line
  //
  const completionScores = [];
  chunksLoop: for (const row of input) {
    let completionScore = 0;
    let opened = [];
    for (const bracket of row) {
      // is opening bracket -> add to currently opened
      if (openings.includes(bracket)) {
        opened.push(bracket);
      } else if (pairs[opened.pop()] !== bracket) {
        // corrupted row -> skip
        continue chunksLoop; // skip current row
      }
    }
    for (let i = opened.length - 1; i >= 0; i--) {
      completionScore =
        completionScore * 5 + completedPointsTable[pairs[opened[i]]];
    }
    completionScores.push(completionScore);
  }
  const middleScore = completionScores.sort((a, b) => a - b)[
    Math.floor(completionScores.length / 2)
  ]; // will always be an odd number of scores
  return middleScore;
};

exports.run1 = run1;
exports.run2 = run2;
