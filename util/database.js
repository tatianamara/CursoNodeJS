const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'tmsg070197', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;