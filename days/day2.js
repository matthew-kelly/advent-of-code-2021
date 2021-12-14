const vectorTable = {
  forward: [0, 1],
  up: [-1, 0],
  down: [1, 0],
};

const run1 = (input) => {
  let position = [0, 0]; // depth, horizontal
  input.forEach((command) => {
    const split = command.split(" ");
    const movement = vectorTable[split[0]].map((x) => x * parseInt(split[1]));
    position = [position[0] + movement[0], position[1] + movement[1]];
  });
  return position[0] * position[1];
};

const run2 = (input) => {
  // up/down only adjust aim
  // aim = 0 => forward * 1
  // else, depth = forward * aim
  let position = [0, 0, 0]; // depth, horizontal, aim
  input.forEach((command) => {
    const split = command.split(" ");
    const movement = vectorTable[split[0]].map((x) => x * parseInt(split[1]));
    // execute horizontal movement & aim adjustment
    let newPosition = [position[0], position[1] + movement[1], position[2] + movement[0]];
    // set new depth if aim != 0
    if (split[0] === 'forward' && position[2] !== 0) {
      newPosition[0] = position[0] + movement[1] * position[2]
    }
    position = newPosition;
  });
  return position[0] * position[1];
};

exports.run1 = run1;
exports.run2 = run2;
