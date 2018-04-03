const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: {type: String, required: true, min: 3, max: 100}
});

genreSchema.virtual('url').get(function() {
    return '/catalog/genres/' + this._id;
});

module.exports = mongoose.model('Genre', genreSchema);