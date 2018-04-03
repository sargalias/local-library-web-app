const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookinstanceSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book'},
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
});

bookinstanceSchema.virtual('url').get(function() {
    return '/catalog/bookinstance/' + this._id;
});

module.exports = mongoose.model('BookInstance', bookinstanceSchema);
