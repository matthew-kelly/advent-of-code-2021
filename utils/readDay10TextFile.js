const fs = require('fs');
const readDay10TextFile = (day) => {
  try {
    let data = fs.readFileSync(`./inputs/day${day}.txt`, 'utf8');
    data = data.split('\n').map((line) => line.split(''));
    return data;
  } catch (e) {
    console.log('Error: ', e.stack);
  }
};
module.exports = readDay10TextFile;
