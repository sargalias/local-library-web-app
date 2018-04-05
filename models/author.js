const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: Date,
    date_of_death: Date
});

authorSchema.virtual('name').get(function() {
    return this.first_name + ' ' + this.family_name;
});

authorSchema.virtual('url').get(function() {
    return '/catalog/authors/' + this._id;
});

authorSchema.virtual('date_of_birth_formatted').get(function() {
    return moment(this.date_of_birth).format('MMM Do, YYYY');
});

authorSchema.virtual('date_of_death_formatted').get(function() {
    return moment(this.date_of_death).format('MMM Do, YYYY');
});

authorSchema.virtual('lifespan').get(function() {
    return this.date_of_birth_formatted + ' - ' + this.date_of_death_formatted;
});

authorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
    return moment(this.date_of_birth).format('YYYY-MM-DD');
});

authorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
    return moment(this.date_of_death).format('YYYY-MM-DD');
});

module.exports = mongoose.model('Author', authorSchema);
