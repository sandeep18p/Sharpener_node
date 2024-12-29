const express = require("express");
// const sequelize = require('./db');
const user = require('./model/user');
const route  = require("./route/create");
const app = express();
var cors = require('cors')


app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/create", route);

app.listen("3000",()=>{
    console.log("working")
})