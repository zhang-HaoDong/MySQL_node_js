const express = require('express');
const app = express();
const path = require('path');
// const staticRoot = path.resolve(__dirname, '../public');
// app.use(express.urlencoded({
//     extended: true,
// }));
app.post("/api/student", (req,res) => {
    console.log(req.body);
})
app.listen(9527,() => {
    console.log("listening on port 9527");
})