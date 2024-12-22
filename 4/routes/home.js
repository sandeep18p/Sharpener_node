module.exports = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <form action="/message" method="POST">
        <input name="username" placeholder="Write a message">
        <button type="submit">Submit</button>
      </form>
    `);
  };
  