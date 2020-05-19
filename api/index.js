const express = require('express');
const router = express.Router();

const users = require('./controller/users');
const books = require('./controller/books');

router.use('/users',users)
router.use('/books',books)

module.exports = router;