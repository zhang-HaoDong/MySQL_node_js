const Class = require('../ORM/Class');
const {Op} = require("sequelize");
const validate = require('validate.js');
const {pick} = require('../utils/propertyHelper')
require("./init")
const moment = require('moment');
const res = require('express/lib/response');
//添加班级
exports.addClass = async function (classObj) {
    classObj = pick(classObj,"name","openDate");
    const rules = {
        name:{
            presence: {
                allowEmpty:false,
            },
            type: 'string'
        },
        openDate:{
            presence: {
                allowEmpty:false,
            },
            datetime:{
                dateOnly: true,
            }
        }
    }
    const result =validate.validate(classObj,rules);
    if(result){
       throw new Error(JSON.stringify(result));
    }
    const ins = await Class.create(classObj);
    return ins.toJSON();
}
//删除班级
exports.deleteClass = async function (id) {
    const res = await Class.destroy({
        where: {
            id,
        }
    });
    return res;
}
//更新班级
exports.updateClass = async function (id, classObj) {
    classObj = pick(classObj,"name","openDate");
    const rules = {
        name:{
            type: 'string'
        },
        openDate:{
            datetime:{
                dateOnly: true,
            }
        }
    }
    const result = validate.validate(classObj,rules);
    if(result){
        throw new Error(JSON.stringify(result));
    }
    const res = await Class.update(classObj, {
        where:{
            id,
        }
    });
    return res;
}
//查询所有班级
exports.findAllClass = async function (keywords = "") {
    const res = await Class.findAndCountAll({
        where: {
            name:{
                [Op.like]: `%${keywords.toString()}%`
            }
        }
    });
    if (res) {
        return JSON.parse(JSON.stringify(res));
    }
    return null;
}
//根据id查询班级
exports.findClassById = async function (id) {
    const res = await Class.findByPk(id);
    if (res) {
        return res.toJSON();
    }
    return null;
}
//根据班级名查询班级
// exports.findClassByName = async function (name) {
//     const res = await Class.findOne({
//         where: {
//             name,
//         }
//     });
//     if (res) {
//         return res.toJSON();
//     }
//     return null;
// }
