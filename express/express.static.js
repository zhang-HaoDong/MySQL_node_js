const express = require('express');
const app = express();
const path = require('path');
const staticRoot = path.resolve(__dirname, '../public');
app.use("/static",express.static(staticRoot));
app.listen(9527,() => {
    console.log("listening on port 9527");
})