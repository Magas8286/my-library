const router = require('express').Router();
const services = require('../../services/library.service');
const Author = require('../../models/author.model');
const Book = require('../../models/book.model');

router.get('/', (request, response) => {
    if(request.query.firstName){
        services.getAuthorsByFirstName(request.query.firstName)
        .then(
            author => response.send(author)
        ).catch(
            error => console.log(error)
        );
    }
    else if(request.query.lastName){
        services.getAuthorByLastName(request.query.lastName)
        .then(
            author => response.send(author)
        ).catch(
            error => console.log(error)
        );
    }
    else{
        services.getAllAuthors()
        .then(
            authors => response.send(authors)
        ).catch(
            error => console.log(error)
        );
    }
});

router.put('/:id', async (request,response) => {
    let author = {books:[]};
    if(request.body.firstName){
        author.firstName = request.body.firstName;
    }
    if(request.body.lastName){
        author.lastName =request.body.lastName;
    }
    if(request.body.title){
        console.log(request.body.title);
        book = await services.getBookByTitle(request.body.title);
        console.log(book);
        author['books'].push(book._id);
    }
    services.updateAuthor(request.params.id, author)
    .then(
        author => response.send(author)
    ).catch(
        error => console.log(error)
    );
});


router.post('/', async (request, response) => {
    let newAuthor = new Author();
    let createNewAuthor = true;
    let authorExists = await services.getAuthorsByFirstName(request.body.firstName);
    console.log(authorExists.length);
    if(authorExists.length > 0){
        if(authorExists[0].firstName === request.body.firstName && authorExists[0].lastName === request.body.lastName){
            console.log("author exists");
            createNewAuthor =false;        
        }
        else{
            newAuthor.firstName = request.body.firstName;
            newAuthor.lastName = request.body.lastName;
        }
    }
    else{
        newAuthor.firstName = request.body.firstName;
        newAuthor.lastName = request.body.lastName;
    }
    if(request.body.title){
        book = await services.getBookByTitle(request.body.title);
        console.log(book);
        if(!book){
            console.log("book doesn't exists");
            let newBook = new Book(request.body);
            bookAdded = await newBook.save();
            if (bookAdded){
                
                newAuthor['books'].push(bookAdded._id)
            }
        }
        else{
            newAuthor['books'].push(book._id);
        }
    }
    if(createNewAuthor){
        author = await newAuthor.save()
        if(author){
            response.send(author)
        }
    }
});

module.exports = router;