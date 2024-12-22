const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <form action="/message" method="POST">
        <input name="username" placeholder="Write a message">
        <button type="submit">Submit</button>
      </form>
    `);
  } else if (req.method === "POST" && req.url === "/message") {
    let dataChunks = [];

    req.on("data", chunk => {
      dataChunks.push(chunk);
    });

    req.on("end", () => {
      const combinedBuffer = Buffer.concat(dataChunks);
      const data = combinedBuffer.toString();
      const value = data.split("=")[1];

      fs.writeFile("index.txt", value, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error writing to file");
          return;
        }

        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  } else if (req.method === "GET" && req.url === "/read") {
    fs.readFile("index.txt", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading file");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h1>${data}</h1>`);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
