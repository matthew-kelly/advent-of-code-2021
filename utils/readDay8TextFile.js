const fs = require('fs');
const readDay8TextFile = (day) => {
  try {
    let data = fs.readFileSync(`./inputs/day${day}.txt`, 'utf8');
    data = data.split('\n').map((x) => x.split(' | '));
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].map((x) => x.split(' '));
    }
    return data;
  } catch (e) {
    console.log('Error: ', e.stack);
  }
};
module.exports = readDay8TextFile;
