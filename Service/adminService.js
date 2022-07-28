const Admin = require('../ORM/admin');
const md5 = require('md5');
const validate = require('validate.js');
const {pick} = require('../utils/propertyHelper');
//添加一个管理员
exports.addAdmin = async function (adminObj) {
    adminObj = pick(adminObj,"loginId","loginPwd")
    const rules = {
        loginId:{
            presence:{
                allowEmpty:false
            },
            type:"string"
        },
        loginPwd:{
            presence:{
                allowEmpty:false
            },
            type:"string"
        }
    }
    const result = validate.validate(adminObj,rules);
    if(result){
        throw new Error(JSON.stringify(result));
    }
    const res = await Admin.findOne({
        where:{
            loginId:adminObj.loginId,
        }
    });
    if (!res) {
        adminObj.loginPwd = md5(adminObj.loginPwd);
        const ins = await Admin.create(adminObj);
        return ins.toJSON();
    }
    return "admin already exist";
}
//删除一个管理员
exports.deleteAdmin = async function (loginId) {
    const res = await Admin.destroy({
        where: {
            loginId,
        }
    })
    return res;
}
//更改一个管理员
exports.updateAdmin = async function (loginId, adminObj) {
    adminObj = pick(adminObj,"loginPwd");
    const rules = {
        loginPwd:{
            type:"string",
            length:{
                minimum:6,
                maximum:16,
            }
        }
    }
    const result = validate.validate(adminObj,rules);
    if(result){
        throw new Error(JSON.stringify(result));
    }
    adminObj.loginPwd = md5(adminObj.loginPwd);
    const res = await Admin.update(adminObj, {
        where: {
            loginId,
        }
    })
    return res;
}
//根据id查询一个管理员
exports.findAdminById = async function (id) {
    const res = await Admin.findByPk(id);
    if (res) {
        return res.toJSON();
    }
    return null;
}
//查询所有的管理员
exports.findAllAdmin = async function () {
    const res = await Admin.findAndCountAll();
    if (res) {
        return JSON.parse(JSON.stringify(res));
    }
    return null;
}
//查询一个管理员
exports.login = async function (loginObj) {
    if(!loginObj.loginPwd || !loginObj.loginId){
        throw new Error("loginId or loginPwd is null");
    }
    loginObj.loginPwd = md5(loginObj.loginPwd)
    const res = await Admin.findOne({
        where: loginObj, 
    })
    if (res) {
        return res;
    }
    throw new Error("please check your loginId or loginPwd");
}
//根据loginId查询一个管理员
exports.findAdminByLoginId = async function (loginId) {
    const res = await Admin.findOne({
        where: {
            loginId,
        }
    })
    if (res) {
        return res.toJSON();
    }
    return null;
}