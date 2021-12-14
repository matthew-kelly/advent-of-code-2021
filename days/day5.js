function convertCoordinateToNumbers(pair) {
  let result = [];
  pair.forEach((num) => {
    result.push(parseInt(num));
  });
  return result;
}

function getAllCoordinatesForLine(first, second, allowDiagonals = false) {
  first = convertCoordinateToNumbers(first);
  second = convertCoordinateToNumbers(second);
  let result = [];
  const diffX = second[0] - first[0];
  const diffY = second[1] - first[1];
  let higher, lower;
  // only use horizontal/vertial lines
  if (diffX === 0 || diffY === 0) {
    if (diffY !== 0) {
      // vertical line
      if (diffY > 0) {
        higher = second;
        lower = first;
      } else {
        higher = first;
        lower = second;
      }
      for (let i = 0; i <= higher[1] - lower[1]; i++) {
        result.push([lower[0], lower[1] + i]);
      }
    }
    // horizontal line
    if (diffX !== 0) {
      if (diffX > 0) {
        higher = second;
        lower = first;
      } else {
        higher = first;
        lower = second;
      }
      for (let i = 0; i <= higher[0] - lower[0]; i++) {
        result.push([lower[0] + i, lower[1]]);
      }
    }
  } else if (allowDiagonals) {
    if (diffX > 0) {
      higher = second;
      lower = first;
    } else {
      higher = first;
      lower = second;
    }
    let directionY = 1;
    if (higher[1] < lower[1]) {
      directionY = -1;
    }
    for (let i = 0; i <= higher[0] - lower[0]; i++) {
      result.push([lower[0] + i, lower[1] + i * directionY]);
    }
  }
  return result;
}

function countOverlap(list) {
  const unique = {};
  for (let i = 0; i < list.length; i++) {
    unique[list[i]] = 1 + (unique[list[i]] || 0);
  }
  let count = 0;
  for (let coord in unique) {
    if (unique[coord] > 1) count += 1;
  }
  return count;
}

const run1 = (input) => {
  // list all line coordinates
  const coordinateList = [];
  for (let i = 0; i < input.length; i++) {
    const lineCoordinates = getAllCoordinatesForLine(input[i][0], input[i][1]);
    if (lineCoordinates.length) {
      lineCoordinates.forEach((coord) => {
        coordinateList.push(coord);
      });
    }
  }
  // count each unique occurrence
  // return number of coordinates with count > 1
  return countOverlap(coordinateList);
};

const run2 = (input) => {
  // same as part 1, but include diagonals
  // list all line coordinates
  const coordinateList = [];
  for (let i = 0; i < input.length; i++) {
    const lineCoordinates = getAllCoordinatesForLine(
      input[i][0],
      input[i][1],
      true
    );
    if (lineCoordinates.length) {
      lineCoordinates.forEach((coord) => {
        coordinateList.push(coord);
      });
    }
  }
  // count each unique occurrence
  // return number of coordinates with count > 1
  return countOverlap(coordinateList);
};

exports.run1 = run1;
exports.run2 = run2;
