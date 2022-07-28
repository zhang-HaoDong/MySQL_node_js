const admin = require("./admin");
const book = require("./book");
const student = require("./student")
const Class = require("./Class");
Class.hasMany(student);
student.belongsTo(Class);
student.belongsToMany(book,{through:'realization_stu_book'});
admin.hasOne(Class);
Class.belongsTo(admin);
