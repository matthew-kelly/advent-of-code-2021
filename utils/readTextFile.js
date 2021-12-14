const fs = require('fs');
const readTextFile = (day) => {
  try {
    const data = fs.readFileSync(`./inputs/day${day}.txt`, 'utf8');
    return data.split("\n");
  } catch(e) {
    console.log('Error: ', e.stack)
  }
}
module.exports = readTextFile;