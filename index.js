console.clear();
const day = '4';
let readTextFile;
if (day === '4') {
  readTextFile = require('./utils/readDay4TextFile');
} else {
  readTextFile = require('./utils/readTextFile');
}
const dayFn = require(`./days/day${day}`);
const input1 = readTextFile(day);
const input2 = readTextFile(day);
console.log({ 'part 1': dayFn.run1(input1) });
console.log({ 'part 2': dayFn.run2(input2) });
