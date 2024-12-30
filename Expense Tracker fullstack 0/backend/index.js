const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./routes/expenses"); 
const sequelize = require("./db"); 

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/expenses", expenseRoutes); 


sequelize.sync() 
  .then(() => {
    console.log("Database connected and synced!");
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  });
