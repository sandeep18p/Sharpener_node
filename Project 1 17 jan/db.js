const { Sequelize } = require("sequelize");


const sequelize = new Sequelize("attendance_db", "root", "san7211@", {
    host: "localhost",
    dialect: "mysql",
    logging: false, 
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to MySQL database successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

module.exports = sequelize;
