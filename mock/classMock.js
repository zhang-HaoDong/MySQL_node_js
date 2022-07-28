const Mock = require('mockjs');
const Class = require('../ORM/Class')
const res = Mock.mock({
    "data|16":[
        {   
            "id|+1": 1,
            "name":"渡一 @id 期",
            "openDate":"@date()",
            'adminId':2,
        }
    ]
}).data;
Class.bulkCreate(res);
