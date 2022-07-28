const jwt = require('jsonwebtoken');
const secret = "zhanghaodong"
exports.publish = function(res, payload = {}, maxage = 3600 * 24){
    let token = jwt.sign(payload, secret, {
        expiresIn: maxage
    });
    res.cookie('token', token, {
        maxAge: maxage * 1000,
        httpOnly: true
    });
    res.header('Authorization', token);
}
exports.verify = function(req){
    let token = req.cookies.token || req.header('Authorization');
    if(token){
        try{
            let payload = jwt.verify(token, secret);
            return payload;
        }catch(err){
            return false;
        }
    }
    return false;
}