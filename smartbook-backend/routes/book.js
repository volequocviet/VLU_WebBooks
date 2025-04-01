const express = require('express');
const Book = require('../models/Book');  // Import product model
const router = express.Router();

// Route: Lấy tất cả sản phẩm
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route: Thêm mới sản phẩm
router.post('/books', async (req, res) => {
    const { name, category, stock, price, imageUrl } = req.body;
    
    try {
        const newBook = new Book({ name, category, stock, price, imageUrl });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: Cập nhật thông tin sản phẩm
router.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category, stock, price, imageUrl } = req.body;
    
    try {
        const book = await Book.findByIdAndUpdate(id, { name, category, stock, price, imageUrl }, { new: true });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: Xóa sản phẩm
router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;