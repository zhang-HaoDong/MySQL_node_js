exports.getErr = function(err = "err",errCode = 500){
    return {
        code:errCode,
        msg:err
    }
}
exports.getRes = function(data){
    return {
        code:0,
        msg:"",
        data:data
    }
}
exports.asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
           const result = await handler(req, res, next);
           res.send(exports.getRes(result));
        } catch (err) {
            next(err);
        }
    }
}