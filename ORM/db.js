const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("myschooldb","root","335329hd",{
    host: "localhost",
    dialect:"mysql",
    logging: false
})
module.exports = sequelize;
