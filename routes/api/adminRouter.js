const { next } = require('cheerio/lib/api/traversing');
const express = require('express');
const router = express.Router();
const adminServ = require('../../Service/adminService');
const { asyncHandler } = require("../getSendResult")
const { encrypt } = require("../../utils/crypt.js");
const jwt = require('../jwt');
router.get('/', asyncHandler(async (req, res) => {
    return await adminServ.findAllAdmin();
}));
// router.get('/:id', asyncHandler(async (req, res) => {
//     const adminId = req.params.id;
//     return await adminServ.findAdminById(adminId);
// }));
router.get('/whoami',asyncHandler(async (req, res) => {
    return await adminServ.findAdminById(req.id);
}));
router.post('/', asyncHandler(async (req, res) => {
    return await adminServ.addAdmin(req.body);
}));
router.post('/login', asyncHandler(async (req, res) => {
    const result = await adminServ.login(req.body);
    // res.header("set-cookie", `token=${req.body.loginId};path=/;max-age=3600`);
    // const val = encrypt(req.body.loginId);
    // res.cookie("token", val, {
    //      maxAge: 3600 * 1000, 
    //      domain: 'localhost',
    //      path: '/',
    //      httpOnly: true,
    //     });
    //     res.header("Authorization", `${val}`);
    jwt.publish(res, {
        id: result.id
    });
    return result;
}));
router.put('/:id', asyncHandler(async (req, res) => {
    return await adminServ.updateAdmin(req.params.id, req.body);
}));
router.delete('/:id', asyncHandler(async (req, res) => {
    return await adminServ.deleteAdmin(req.params.id);
}));

module.exports = router;