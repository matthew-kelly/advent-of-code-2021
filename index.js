console.clear();
const day = '10';
let readTextFile;
if (day === '4') {
  readTextFile = require('./utils/readDay4TextFile');
} else if (day === '5') {
  readTextFile = require('./utils/readDay5TextFile');
} else if (day === '6' || day === '7') {
  readTextFile = require('./utils/readDay6TextFile');
} else if (day === '8') {
  readTextFile = require('./utils/readDay8TextFile');
} else if (day === '9') {
  readTextFile = require('./utils/readDay9TextFile');
} else if (day === '10') {
  readTextFile = require('./utils/readDay10TextFile');
} else {
  readTextFile = require('./utils/readTextFile');
}
const dayFn = require(`./days/day${day}`);
const input1 = readTextFile(day);
const input2 = readTextFile(day);
console.log({ 'part 1': dayFn.run1(input1) });
console.log({ 'part 2': dayFn.run2(input2) });
