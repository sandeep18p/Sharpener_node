// person.js
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js');
const Slot = require("./"); 

const Person = sequelize.define('person', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slotId: {  // This is the foreign key to associate with the Slot model
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Person.belongsTo(Slot, { foreignKey: 'slotId', as: 'slot' });
module.exports = Person;
