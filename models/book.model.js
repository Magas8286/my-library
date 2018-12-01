const mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
  title: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
});

module.exports = mongoose.model('Book', bookSchema);