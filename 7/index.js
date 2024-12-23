const express = require("express");
const bodyParser = require("body-parser");
const indexRoutes = require('./routes/indexRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`Request Time: ${new Date().toISOString()}`);
    next();
});



app.use('/', indexRoutes);
app.use('/product', productRoutes);
app.use((req, res) => {
    res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(3000, () => {
    console.log('Running server on port 3000');
});
