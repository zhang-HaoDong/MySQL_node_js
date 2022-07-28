const sequelize = require('./db');
const {DataTypes} = require("sequelize");
module.exports = sequelize.define("admin",{
   loginId:{
       type:DataTypes.STRING,
       allowNull:false
   },
   loginPwd:{
       type:DataTypes.STRING,
       allowNull:false
   },
},
{
    createdAt:true,
    updatedAt:true,
    paranoid:true
}
)