const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const moment = require("moment");
module.exports = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      get(){
        return +moment.utc(this.getDataValue('birthday'));
      }
    },
    age:{
      type:DataTypes.VIRTUAL,
      get(){
        return moment.utc().diff(moment.utc(this.birthday),'y');
      }
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false,
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
  }
);