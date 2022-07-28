const Student = require('../ORM/student');
const { Op } = require("sequelize");
const validate = require("validate.js");
const moment = require("moment");
const Class = require("../ORM/Class.js")
const classServ = require("./classService");
const { pick } = require("../utils/propertyHelper.js")
//添加一个学生
exports.addStudent = async function (stuObj) {
    stuObj = pick(stuObj, "name", "birthday", "sex", "mobile", "ClassId");
    //为validate扩展一个判断班级id是否存在的方法
    validate.validators.classExits = async function (id) {
        return await classServ.findClassById(id) ? undefined : "is not exits";
    }
    const rules = {
        name: {
            presence: {
                allowEmpty: false,
            },
            type: "string",
            length: {
                minimum: 2,
                maximum: 20,
            }
        },
        birthday: {
            presence: {
                allowEmpty: false,
            },
            datetime: {
                dateOnly: true,
                earliest: +moment.utc().subtract(100, 'y'),
                latest: +moment.utc().subtract(5, 'y'),
            },
        },
        sex: {
            presence: true,
            type: "boolean"
        },
        mobile: {
            presence: {
                allowEmpty: false,
            },
            format: /1\d{10}$/,
        },
        ClassId: {
            presence: true,
            numericality: {
                onlyInteger: true,
                strict: false,
            },
            classExits: true,
            //判断班级id是否存在
        }
    }
    await validate.async(stuObj, rules);
    const res = await Student.create(stuObj);
    return res.toJSON();
}
//删除一个学生
// exports.deleteStudent = async function (mes) {
//     const res = await Student.destroy({
//         where: {
//             [Op.or]: [
//                 {
//                     id: {
//                         [Op.eq]: +mes,
//                     }
//                 },
//                 {
//                     name: {
//                         [Op.eq]: mes.toString(),
//                     }
//                 },
//                 {
//                     mobile: {
//                         [Op.eq]: +mes,
//                     }
//                 }
//             ]
//         }
//     });
//     return res;
// }
exports.deleteStudent = async function (id) {
    const res = await Student.destroy({
        where: {
            id,
        }
    });
    return res;
}
//更新一个学生
exports.updateStudent = async function (id, stuObj) {
    stuObj = pick(stuObj, "name", "birthday", "sex", "mobile", "ClassId");
    //为validate扩展一个判断班级id是否存在的方法
    validate.validators.classExits = async function (id) {
        if(stuObj.ClassId){
        return await classServ.findClassById(id) ? undefined : "is not exits";
        }
    }
    const rules = {
        name: {
            type: "string",
            length: {
                minimum: 2,
                maximum: 20,
            }
        },
        birthday: {
            datetime: {
                dateOnly: true,
                earliest: +moment.utc().subtract(100, 'y'),
                latest: +moment.utc().subtract(5, 'y'),
            },
        },
        sex: {
            type: "boolean"
        },
        mobile: {
            format: /1\d{10}$/,
        },
        ClassId: {
            presence:false,
            numericality: {
                onlyInteger: true,
                strict: false,
            },
            classExits: true,
        }
    }
    // if(stuObj.ClassId){
    //     rules.ClassId = {
    //         numericality: {
    //             onlyInteger: true,
    //             strict: false,
    //         },
    //         classExits: true,
    //         //判断班级id是否存在
    //     }
    // }
    await validate.async(stuObj, rules);
    const res = await Student.update(stuObj, {
        where: {
            id,
        }
    });
    return res;
}
//查询所有学生
exports.findAllStudent = async function (page = 1, limit = 10, sex = -1, name = "") {
    const where = {};
    if (sex !== -1) {
        where.sex = !!sex;
    }
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`
        };
    }
    const res = await Student.findAndCountAll({
        attributes: ["id", "name", "sex", "birthday", "age"],
        offset: (page - 1) * limit,
        limit:+limit,
        where,
        include: [Class]
    })
    if (res) {
        return JSON.parse(JSON.stringify(res));
    }
    return {
        code:0,
        msg:"没有数据"
    };
}
//根据id查询学生
exports.findStudentById = async function (id) {
    const res = await Student.findOne({
        where: {
            id: +id,
        }
    });
    if (res) {
        return res.toJSON();
    }
    return {
        code:0,
        msg:"无法查询到此学生"
    };
}
