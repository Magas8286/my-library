const router = require('express').Router();
const services = require('../../services/library.service');
const Book = require('../../models/book.model')

router.get('/', (request, response) => {
    if(request.query.title){
        services.getBookByTitle(request.query.title)
        .then(
            books => response.send(books)
        ).catch(
            error => console.log(error)
        );
    }
    else{
       services.getAllBooks()
        .then(
            books => response.send(books)
        ).catch(
            error => console.log(error)
        );
    }
});


router.put('/:id', async (request,response) => {
    let book = {};
    if(request.body.title){
        book.title = request.body.title;
    }
    if(request.body.firstName){
       author = await services.getAuthorsByFirstName(request.body.firstName)
       book.author = author[0]._id;
    }
    services.updateBook(request.params.id, book)
    .then(
        book => response.send(book)
    ).catch(
        error => console.log(error)
    );
});


router.post('/', async (request,response) => {
    let newBook = new Book(request.body);
    if(request.body.firstName){
        author = await services.getAuthorsByFirstName(request.body.firstName)
        newBook.author = author[0]._id;
    }
    book = await newBook.save()
    if(book){
        response.send(book)
    }
});

module.exports = router;