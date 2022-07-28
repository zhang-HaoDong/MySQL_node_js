//使用对称加密算法：aes 128
// 128位秘钥
const secret = Buffer.from("0o5nvolgd1wjashp");
const crypto = require("crypto");
const result = crypto.getCiphers();
const iv = "81vn3lah2fnxnx87";
exports.encrypt = function (str) {
    const cipher = crypto.createCipheriv("aes-128-cbc", secret, iv);
    let result = cipher.update(str, "utf8", "hex");
    result += cipher.final("hex");
    return result;
}
exports.decrypt = function (str) {
    const decipher = crypto.createDecipheriv("aes-128-cbc", secret, iv);
    let result = decipher.update(str, "hex", "utf8");
    result += decipher.final("utf8");
    return result;
}