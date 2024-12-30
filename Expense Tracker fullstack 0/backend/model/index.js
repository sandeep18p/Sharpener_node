const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = require('../db'); // Adjust the path as necessary

const Expense = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Handles monetary values with precision
    allowNull: false,
    validate: {
      isDecimal: true, // Ensures valid decimal value
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt columns
});

(async () => {
  await sequelize.sync({}); // Syncs the model with the database
  console.log("Expense model synced with database.");
})();

module.exports = Expense;
