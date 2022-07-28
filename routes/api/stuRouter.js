const { next } = require('cheerio/lib/api/traversing');
const express = require('express');
const router = express.Router();
const stuServ = require('../../Service/studentService');
const { asyncHandler } = require("../getSendResult")

router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const name = req.query.name || "";
    const sex = req.query.sex || -1;
    const limit = req.query.limit || 10;
    return await stuServ.findAllStudent(page, limit, sex, name);
}));
router.get('/:id', asyncHandler(async (req, res) => {
    const stuId = req.params.id;
    return await stuServ.findStudentById(stuId);
}));
router.post('/', asyncHandler(async (req, res) => {
    req.body.sex = !!req.body.sex;
    return await stuServ.addStudent(req.body);
}));
router.put('/:id', asyncHandler(async (req, res) => {
    req.body.sex = !!req.body.sex;
    return await stuServ.updateStudent(+req.params.id, req.body);
}));
router.delete('/:id', asyncHandler(async (req, res) => {
    return await stuServ.deleteStudent(+req.params.id);
}));
module.exports = router;