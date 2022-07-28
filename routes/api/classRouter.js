const express = require('express');
const router = express.Router();
const classServ = require('../../Service/classService');
const {asyncHandler} = require('../getSendResult');

router.get('/', asyncHandler(async (req, res) => {
    const kw = req.query.kw || "";
    return await classServ.findAllClass(kw);
}));
router.get('/:id', asyncHandler(async (req, res) => {
    const classId = req.params.id;
    return await classServ.findClassById(classId);
}))
router.post('/', asyncHandler(async (req, res,next) => {
    return await classServ.addClass(req.body);
}));
router.put('/:id', asyncHandler(async (req, res) => {
    const classObj = {};
    req.query.name && (classObj.name = req.query.name);
    req.query.openDate && (classObj.openDate = req.query.openDate);
    return await classServ.updateClass(+req.params.id, classObj);
}));
router.delete('/:id', asyncHandler(async (req, res) => {
    return await classServ.deleteClass(+req.params.id);
}));
module.exports = router;