const fs = require("fs");

module.exports = {
  writeToFile: (filePath, content, callback) => {
    fs.writeFile(filePath, content, callback);
  },

  readFromFile: (filePath, callback) => {
    fs.readFile(filePath, "utf8", callback);
  },
};
