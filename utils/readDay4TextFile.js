const fs = require("fs");
const readDay4TextFile = (day) => {
  try {
    let data = fs.readFileSync(`./inputs/day${day}.txt`, "utf8");
    data = data.split("\n\n").map(x => x.split("\n"));
    return data;
  } catch (e) {
    console.log("Error: ", e.stack);
  }
};
module.exports = readDay4TextFile;
