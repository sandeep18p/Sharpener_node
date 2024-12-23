const express =  require("express");
const app = express();
const helper = require("./utils/helper")
const path = require("path");

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));
app.get("/home",(req,res)=>{
    res.sendFile(path.join(helper,"views","index.html"))
});

app.get("/contactus",(req,res)=>{
    res.sendFile(path.join(helper,"views","contactus.html"))
});

app.post("/success",(req,res)=>{
    res.redirect("/success");
});

app.get("/success",(req,res)=>{
    res.sendFile(path.join(helper,"views","success.html"))
});


app.listen("3000",()=>{
    console.log("wwe")
})