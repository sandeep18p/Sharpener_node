const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <form action="/message" method="POST">
        <input name="message" placeholder="Write a message">
        <button type="submit">Submit</button>
      </form>
    `);
  } else if (req.method === "POST" && req.url === "/message") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const message = new URLSearchParams(body).get("message");

      const messageWithText = `${message}\n`;

      fs.appendFile(path.join(__dirname, "index.txt"), messageWithText, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error saving message");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Message saved");
      });
    });
  } else if (req.method === "GET" && req.url === "/read") {
    fs.readFile(path.join(__dirname, "index.txt"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading file");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
