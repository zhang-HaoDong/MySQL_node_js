const { getErr } = require("./getSendResult")
const { pathToRegexp } = require("path-to-regexp");
// const {decrypt} = require("../utils/crypt");
const jwt = require('./jwt')
const needTokenApi = [
    {
        method: "POST",
        path: "/api/student",
    },
    {
        method: "PUT",
        path: "/api/student/:id",
    },
    {
        method: "GET",
        path: "/api/admin/whoami",
    }
]
module.exports = function (req, res, next) {
    const apis = needTokenApi.filter((i) => {
        if (i.method === req.method && pathToRegexp(i.path).test(req.path)) {
            return true;
        }
        return false;
    })
    if (apis.length == 0) {
        next();
        return;
    }
    const payload = jwt.verify(req);
    if (payload) {
        // const loginId = decrypt(token);
        req.id = payload.id;
        next();
    } else {
        res.status(403).send(getErr("请登录", 403));
    }
}