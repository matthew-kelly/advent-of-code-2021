console.clear();
const readTextFile = require('./utils/readTextFile')
const day = "3";
const dayFn = require(`./days/day${day}`);
const input = readTextFile(day);
console.log({"part 1": dayFn.run1(input), "part 2": dayFn.run2(input)});