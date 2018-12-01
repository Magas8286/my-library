const router = require('express').Router();
const authors = require('./authors');
const books = require('./books');

router.get('/', (request, response) => {
    response.send("Welcome to my library")
});

router.use('/authors', authors);
router.use('/books', books);

module.exports = router;