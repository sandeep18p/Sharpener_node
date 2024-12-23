const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    const cp = req.body;
    console.log(cp);
    res.redirect("/working");
});

router.get("/working", (req, res) => {
    res.send("<h1>pahuch gaya</h1>");
});

module.exports = router;
