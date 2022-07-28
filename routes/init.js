const express = require('express');
const app = express();
const path = require('path');
const staticRoot = path.resolve(__dirname, '../public');

// 设置静态资源目录
app.use(express.static(staticRoot));

//加入cors中间件
const cors = require('cors');
app.use(cors());
// 加入cookie模块设置
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(require("./cookieMiddleware"));
// 处理请求信息
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//处理api请求
app.use("/api/student",require("./api/stuRouter"));
app.use("/api/class",require("./api/classRouter"));
app.use("/api/admin",require("./api/adminRouter"));
app.use("/api/book",require("./api/bookRouter"));

//处理错误信息
app.use(require("./errMiddleware"));
app.listen(8000,()=> {
    console.log("server is running");
})