const { readFromFile } = require("../utils/fileHandler");

module.exports = (req, res) => {
  readFromFile("index.txt", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error reading file");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>${data}</h1>`);
  });
};
