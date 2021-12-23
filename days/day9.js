function checkForLowPoint(cell, top, bottom, left, right) {
  return (
    checkNeighbour(cell, top) &&
    checkNeighbour(cell, bottom) &&
    checkNeighbour(cell, left) &&
    checkNeighbour(cell, right)
  );
}

function checkNeighbour(cell, neighbour) {
  return neighbour === undefined ||
    (neighbour !== undefined && cell < neighbour)
    ? true
    : false;
}

const run1 = (input) => {
  // find points that are lower than their cardinal neighbours
  // return sum of risk levels (1 + height)

  // for each row, check each coordinate
  const lowPoints = [];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const cell = input[row][col];
      const top =
        input[row - 1] !== undefined ? input[row - 1][col] : undefined;
      const bottom =
        input[row + 1] !== undefined ? input[row + 1][col] : undefined;
      const left =
        input[row][col - 1] !== undefined ? input[row][col - 1] : undefined;
      const right =
        input[row][col + 1] !== undefined ? input[row][col + 1] : undefined;
      let cellCheck = checkForLowPoint(cell, top, bottom, left, right);
      if (cellCheck) {
        lowPoints.push(input[row][col]);
      }
    }
  }
  let sum = 0;
  lowPoints.forEach((point) => (sum += point + 1));
  return sum;
};

function getHeight(map, row, col) {
  return map[row][col];
}

// get adjacent cells, filter out non-existant cells
function getAdjacentCells(grid, row, col) {
  return [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ].filter(([row1, col1]) => row1 in grid && col1 in grid[row1]);
}

function searchBasin(grid, row, col, basinLow = undefined, points = []) {
  const height = getHeight(grid, row, col);

  if (basinLow === undefined) {
    // set basinLow to current height if this is the first run
    basinLow = height;
  }

  points.push([row, col].join(','));

  for (const [row1, col1] of getAdjacentCells(grid, row, col)) {
    if (points.includes([row1, col1].join(','))) {
      // cell already counted, skip
      continue;
    }
    const adjacentCellHeight = getHeight(grid, row1, col1);
    if (adjacentCellHeight >= 9) {
      // cell is basin edge, skip
      continue;
    }
    if (adjacentCellHeight < basinLow) {
      // current cell is lower than previous basinLow, stop operations
      return false;
    }
    if (!searchBasin(grid, row1, col1, basinLow, points)) {
      // sub-search has returned false (current point has been added though), stop operations
      return false;
    }
  }

  return points;
}

// run2 adapted from https://github.com/sk1talets/advent-of-code/blob/main/2021/9/script.2.js
const run2 = (input) => {
  // basin = area around low point bordered by 9's
  // 9's are not part of any basin
  // find size of each basin, multiply 3 largest together
  const basinSizes = [];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const points = searchBasin(input, row, col);
      if (points) {
        basinSizes.push(points.length);
      }
    }
  }
  const result = basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((size, total) => (total *= size));
  return result;
};

exports.run1 = run1;
exports.run2 = run2;
