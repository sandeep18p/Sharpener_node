const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');


const sequelize = require('../db/db.js'); 

const Slot = sequelize.define('slot', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  available: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
}, {
  timestamps: true, 
});

(async () => {
  await sequelize.sync(); 
  console.log("Slot model synced with database.");
})();

module.exports = Slot;
