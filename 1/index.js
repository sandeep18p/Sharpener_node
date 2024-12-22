const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  
  let responseMessage;

  switch(req.url) {
    case '/':
      responseMessage = '<h1>Hello World</h1>';
      break;
    case '/pizza':
      responseMessage = '<h1>This is your pizza</h1>';
      break;
    case '/home':
      responseMessage = '<h1>Welcome home</h1>';
      break;
    case '/about':
      responseMessage = '<h1>Welcome to About Us</h1>';
      break;
    case '/node':
      responseMessage = '<h1>Welcome to my Node Js project</h1>';
      break;
    default:
      responseMessage = '<h1>Page Not Found</h1>';
      break;
  }

  res.statusCode = 200;
  res.end(`<html><body>${responseMessage}</body></html>`);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
