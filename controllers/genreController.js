const genreModel = require('../models/genre');
const bookModel = require('../models/book');
const async = require('async');

// Genre list
exports.genre_list = function(req, res, next) {
    genreModel.find()
        .sort({name: 1})
        .exec((err, data) => {
            if (err) return next(err);
            res.render('genre_list',
                {title: 'Genre List', genre_list: data});
        })
};

// Genre show
exports.genre_show = function(req, res, next) {
    async.parallel({
        genre: function(callback) {
            genreModel.findById(req.params.genre_id, callback);
        },
        genre_books: function(callback) {
            bookModel.find({genre: req.params.genre_id}, callback);
        }
    },function(err, results) {
        if (err) return next(err);
        if (results.genre == null) {
            const err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        res.render('genre_detail', {
            title: 'Genre Detail',
            genre: results.genre,
            genre_books: results.genre_books
        });
    });
};

// Genre new
exports.genre_new = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Genre create
exports.genre_create = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Genre delete form
exports.genre_delete_form = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Genre delete
exports.genre_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Genre edit
exports.genre_edit = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Genre update
exports.genre_update = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};