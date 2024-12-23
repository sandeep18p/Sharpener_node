const bodyParser = require("body-parser");
const express = require("express");
const app = express();


app.use(bodyParser.urlencoded({extended:false}))
app.use((req, res, next) => {
    console.log(`Request Time: ${new Date().toISOString()}`);
    next();
});

app.get("/", (req, res) => {
    res.send(`<form action="/product" method="POST">
        <input type="text" placeholder="Enter something" name="key">
        <button type="submit">submit</button>
        </form>`);
});

app.post("/product",(req, res)=>{
    const cp = req.body;
    console.log(cp)
   res.redirect("/working")
})

app.get("/working",(req,res)=>{
    res.send(`<h1>pahuch gaya</h1>`)
})

app.listen(3000, () => {
    console.log('Running server on port 3000');
});
