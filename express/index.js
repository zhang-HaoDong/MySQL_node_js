const express = require('express');
const app = express();
app.get("/abc/:id",(req,res)=>{
    console.log(req.headers);//获取请求头
    console.log(req.path);//获取请求路径:/abc
    console.log(req.query);//获取请求参数
    console.log(req.params);//获取动态id
    // res.send([3,4,5]);
    // res.status(302).header("location","http://www.baidu.com").end();
    // res.status(302).location("location","http://www.baidu.com").end();
    res.redirect("http://www.baidu.com");
});
app.get("*",(req,res) => {
    console.log(123);
    res.end();
})
app.listen(3000, () => {
    console.log('server is running on port 3000');
});