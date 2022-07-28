const sequelize = require("./db");
sequelize.sync({alter:true}).then(()=> {
    console.log("完成");
});