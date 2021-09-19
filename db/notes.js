const fs = require("fs");
const path = "notes.json";

function writeData(data) {
    try {
    fs.writeFile(path, JSON.stringify(data), 'utf8', function (err) {
        if (err) return false;
     });
    } catch(err) {
        console.error(err)
        return false
      }
}

module.exports = {
      writeData
  }