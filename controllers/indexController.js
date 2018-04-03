const bookModel = require('../models/book');
const authorModel = require('../models/author');
const genreModel = require('../models/genre');
const bookinstanceModel = require('../models/bookinstance');
const async = require('async');


exports.index = function(req, res) {

    async.parallel({
        bookCount: function(callback) {
            bookModel.count({}, callback);
        },
        bookInstanceCount: function(callback) {
            bookinstanceModel.count({}, callback);
        },
        bookInstanceAvailableCount: function(callback) {
            bookinstanceModel.count({status: 'Available'}, callback);
        },
        authorCount: function(callback) {
            authorModel.count({}, callback);
        },
        genreCount: function(callback) {
            genreModel.count({}, callback);
        }
    }, function(err, results) {
        res.render('index', {title: 'Local Library Home', error: err, data: results});
    });
};