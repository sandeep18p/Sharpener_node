const { writeToFile } = require("../utils/fileHandler");

module.exports = (req, res) => {
  let dataChunks = [];

  req.on("data", (chunk) => {
    dataChunks.push(chunk);
  });

  req.on("end", () => {
    const combinedBuffer = Buffer.concat(dataChunks);
    const data = combinedBuffer.toString();
    const value = decodeURIComponent(data.split("=")[1]);

    writeToFile("index.txt", value, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error writing to file");
        return;
      }

      res.writeHead(302, { Location: "/" });
      res.end();
    });
  });
};
