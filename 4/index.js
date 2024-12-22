const http = require("http");
const homeRoute = require("./routes/home");
const messageRoute = require("./routes/message");
const readRoute = require("./routes/read");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    homeRoute(req, res);
  } else if (req.method === "POST" && req.url === "/message") {
    messageRoute(req, res);
  } else if (req.method === "GET" && req.url === "/read") {
    readRoute(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
