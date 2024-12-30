const { Sequelize } = require('sequelize');

// Creating an initial Sequelize instance with no database specified to authenticate
const sequelize = new Sequelize('db', 'root', 'san7211@', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;