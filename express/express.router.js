const express = require('express');
const app = express();
const router = express.Router();

router.get("/",(req,res) => {
    //获取所有学生信息
    console.log("获取所有学生信息");
})
router.get("/:id",(req,res) => {
    //获取指定id的学生信息
    console.log("获取指定id的学生信息");
    console.log(req.params.id);
})
router.put("/",(req,res)=>{
    //更新学生信息
    console.log("更新学生信息");
})
app.use("/api/student",router);
app.listen(9527,() => {
    console.log("listening on port 9527");
})