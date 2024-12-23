const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

app.use((req, res, next) => {
    console.log(`Request Time: ${new Date().toISOString()}`);
    next();
});

app.get("/", (req, res) => {
    res.send(`<h1>Working</h1>`);
});

app.listen(3000, () => {
    console.log('Running server on port 3000');
});
