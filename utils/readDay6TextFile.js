const fs = require('fs');
const readDay6TextFile = (day) => {
  try {
    let data = fs.readFileSync(`./inputs/day${day}.txt`, 'utf8');
    data = data.split(',').map((num) => parseInt(num));
    return data;
  } catch (e) {
    console.log('Error: ', e.stack);
  }
};
module.exports = readDay6TextFile;
