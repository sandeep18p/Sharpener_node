const express =  require("express");
const app = express();
const db = require('./util/db');

db.execute('SELECT * FROM expenses')
  .then(result => {
    console.log(result[0], result[1]);
  })
  .catch(err => {
    console.log(err);
  });

app.listen(3000,()=>{
  console.log("working")
})