const { getErr } = require("./getSendResult")
module.exports = (err, req, res, next) => {
    if (err) {
        const errObj = err instanceof Error ? err.message : err
        // const errObj = err.message

        res.status(500).send(getErr(errObj));
    }
    else {
        next();
    }
}