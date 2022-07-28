const Book = require("../ORM/book.js")
const { Op } = require("sequelize")
const validate = require("validate.js");
const {pick} = require("../utils/propertyHelper")
//添加一本书
exports.addBook = async function (bookObj) {
    bookObj = pick(bookObj,"name","imgurl","publishDate","author")
    const rules = {
        name:{
            presence: {
                allowEmpty:false
            },
            type:"string"
        },
        imgurl: {
            presence: {
                allowEmpty:false
            },
            type:"string"
        },
        publishDate:{
            presence: {
                allowEmpty:false
            },
            datetime:{
                dateOnly:true
            }
        },
        author:{
            presence: {
                allowEmpty:false
            },
            type:"string"
        }
    }
    const result = validate.validate(bookObj, rules);
    if(result){
        throw new Error(JSON.stringify(result));
    }
    const ins = await Book.create(bookObj);
    return ins.toJSON();
}
//删除一本书
exports.deleteBook = async function (id) {
    const res = await Book.destroy({
        where: {
            id,
        }
    });
    return res;
}
//更新一本书
exports.updateBook = async function (id, bookObj) {
    bookObj = pick(bookObj,"name","imgurl","publishDate","author")
    const rules = {
        name:{
            type:"string"
        },
        imgurl: {
            type:"string"
        },
        publishDate:{
            datetime:{
                dateOnly:true
            }
        },
        author:{
            type:"string"
        }
    }
    const result = validate.validate(bookObj, rules);
    if(result){
        throw new Error(JSON.stringify(result));
    }
    const res = await Book.update(bookObj, {
        where: {
            id,
        }
    });
    return res;
}
//查询所有书籍
exports.findAllBook = async function (keywords = "", page = 1, limit = 10,) {
    const res = await Book.findAndCountAll({
        offset: (page - 1) * limit,
        limit,
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${keywords}%`
                    },
                },
                {
                    author: {
                        [Op.like]: `%${keywords}%`
                    }
                }

            ]

        }
    });
    return res ? JSON.parse(JSON.stringify(res)) : null;
}
//根据书id查询书籍
exports.findBookById = async function (id) {
    const res = await Book.findOne({
        where: {
            id,
        }
    });
    if (res) {
        return res.toJSON();
    }
    return null;
}