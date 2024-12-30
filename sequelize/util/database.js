const Sequelize = require('sequelize');

const sequelize = new Sequelize('db', 'root', 'san7211@', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
