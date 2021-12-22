console.clear();
const day = '8';
let readTextFile;
if (day === '4') {
  readTextFile = require('./utils/readDay4TextFile');
} else if (day === '5') {
  readTextFile = require('./utils/readDay5TextFile');
} else if (day === '6' || day === '7') {
  readTextFile = require('./utils/readDay6TextFile');
} else if (day === '8') {
  readTextFile = require('./utils/readDay8TextFile');
} else {
  readTextFile = require('./utils/readTextFile');
}
const dayFn = require(`./days/day${day}`);
const input1 = readTextFile(day);
const input2 = readTextFile(day);
console.log({ 'part 1': dayFn.run1(input1) });
console.log({ 'part 2': dayFn.run2(input2) });
