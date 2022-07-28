const student = require("../ORM/student");
const Mock = require("mockjs")
const res = Mock.mock({
    "data|700": [
        {
            "name": "@cname",
            "birthday": "@date",
            "sex|1-2": true,
            "mobile": /^1\d{10}/,
            "ClassId|1-16":1,
        }
    ]
}).data;
student.bulkCreate(res);