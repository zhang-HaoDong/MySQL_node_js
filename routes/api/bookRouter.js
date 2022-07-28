const express = require('express');
const router = express.Router();
const bookServ = require('../../Service/bookService');
const {asyncHandler} = require("../getSendResult")

router.get('/', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const kw = req.query.kw || "";
    return await bookServ.findAllBook(kw, page, limit);
}));
router.get('/:id', asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    return await bookServ.findBookById(bookId);
}))
router.post('/', asyncHandler(async (req, res) => {
        return await bookServ.addBook(req.body);
}));
router.put('/:id', asyncHandler(async (req, res) => {
    return await bookServ.updateBook(+req.params.id, req.body);
}));
router.delete('/:id', asyncHandler(async (req, res) => {
    return await bookServ.deleteBook(+req.params.id);
}));
module.exports = router;