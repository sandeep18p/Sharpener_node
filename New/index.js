const express = require("express");
const path = require("path");
const routes = require("./routes/routes");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
