const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send(`
        <form action="/product" method="POST">
            <input type="text" placeholder="Enter something" name="key">
            <button type="submit">submit</button>
        </form>
    `);
});

module.exports = router;
