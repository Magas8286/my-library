const mongoose = require('mongoose');

let authorSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

let Author = mongoose.model('Author', authorSchema);

module.exports = Author;