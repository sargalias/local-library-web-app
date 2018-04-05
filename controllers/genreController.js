const genreModel = require('../models/genre');
const bookModel = require('../models/book');
const ObjectId = require('mongoose').Types.ObjectId;
const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');

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
    res.render('genre_new', {title: 'Create Genre'});
};

// Genre create
exports.genre_create = [
    body('name')
        .trim()
        .isLength({min: 1}).withMessage('Must have at least one character')
        .isAlpha().withMessage('Must contain letters only'),
    sanitizeBody('name')
        .trim()
        .escape(),

    function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('genre_new',
                {title: 'Create genre', errors: errors.array()}
            );
        }
        next();
    }, function(req, res, next) {
        const genre = matchedData(req);
        console.log(genre);
        genreModel.findOne(
            {name: {$regex: new RegExp(genre.name, 'i')}},
            (err, data) => {
                if (err) return next(err);
                if (data !== null) {
                    console.log('already exists');
                    res.redirect('/catalog/genres');
                } else {
                    genreModel.create(genre, (err, data) => {
                        if (err) return next(err);
                        console.log('created new');
                        res.redirect('/catalog/genres');
                    });
                }
        });
    }
];

// Genre delete form
exports.genre_delete_form = function(req, res) {
    async.parallel({
        genre: function(callback) {
            genreModel.findById(req.params.genre_id).exec(callback);
        },
        genre_books: function(callback) {
            bookModel.find({ 'genre': req.params.genre_id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre==null) {
            res.redirect('/catalog/genres');
        }
        res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, genre_books: results.genre_books } );
    });
};

// Genre delete
exports.genre_delete = function(req, res, next) {
    async.parallel({
        genre: function(callback) {
            genreModel.findById(req.params.genre_id).exec(callback);
        },
        genre_books: function(callback) {
            bookModel.find({ 'genre': req.params.genre_id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre_books.length > 0) {
            res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, genre_books: results.genre_books } );
            return;
        }
        else {
            genreModel.findByIdAndRemove(ObjectId(req.params.genre_id), (err) => {
                if (err) return next(err);
                res.redirect('/catalog/genres');
            });
        }
    });
};

// Genre edit
exports.genre_edit = function(req, res, err) {
    genreModel.findById(req.params.genre_id, function(err, genre) {
        if (err) { return next(err); }
        if (genre==null) {
            err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        res.render('genre_edit', { title: 'Update Genre', genre: genre });
    });
};

// Genre update
exports.genre_update = [
    body('name', 'Genre name required').isLength({ min: 1 }).trim(),
    sanitizeBody('name').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            genreModel.findById(req.params.genre_id, (err, data) => {
                if (err) return next(err);
                return res.render('genre_form', { title: 'Update Genre', genre: data, errors: errors.array()});
            });
        }
        else {
            genreModel.findByIdAndUpdate(ObjectId(req.params.genre_id), {name: req.body.name}, (err,thegenre) => {
                if (err) { return next(err); }
                res.redirect(thegenre.url);
            });
        }
    }
];