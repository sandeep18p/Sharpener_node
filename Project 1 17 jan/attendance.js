const { DataTypes } = require("sequelize");
const sequelize = require("./db");


const Attendance = sequelize.define("Attendance", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Present", "Absent"),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: "attendance_records",
    timestamps: true,
});


(async () => {
    await Attendance.sync({ alter: true });
    console.log("Attendance table created or updated.");
})();

module.exports = Attendance;
