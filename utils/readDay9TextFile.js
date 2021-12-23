const fs = require('fs');
const readDay9TextFile = (day) => {
  try {
    const data = fs.readFileSync(`./inputs/day${day}.txt`, 'utf8');
    return data
      .split('\n')
      .map((line) => line.split('').map((cell) => parseInt(cell)));
  } catch (e) {
    console.log('Error: ', e.stack);
  }
};
module.exports = readDay9TextFile;
