const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
});

// Virtual for book's URL
bookSchema.virtual('url').get(function() {
    return '/catalog/books/' + this._id;
});

module.exports = mongoose.model('Book', bookSchema);
