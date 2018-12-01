const Author = require('../models/author.model');
const Book = require('../models/book.model');

//--------------------Authors-----------------------------------------
function getAllAuthors() {
  return Author.find().populate('books');
}

function getAuthorsByFirstName(firstName) {
  return Author.find({firstName:firstName}).populate('books');
}

function getAuthorByLastName(lastName) {
  return Author.find({lastName:lastName}).populate('books');
}

function getAllBooks() {
  return Book.find().populate('author');
}

function updateAuthor(id, author){
  return Author.findByIdAndUpdate({_id:id},{$set: author},{new:true});
}

//---------------------------Books-------------------------------------

function getBookByTitle(title){
  return Book.findOne({title:title}).populate('author');
}

function updateBook(id, book){
  console.log(book);
  return Book.findByIdAndUpdate({_id:id},{$set: book}, {new:true});
}


module.exports = {
  getAllBooks,
  getAllAuthors,
  getAuthorsByFirstName,
  getAuthorByLastName,
  getBookByTitle,
  updateAuthor,
  updateBook
}