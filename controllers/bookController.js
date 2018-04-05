const bookModel = require('../models/book');
const authorModel = require('../models/author');
const genreModel = require('../models/genre');
const bookinstanceModel = require('../models/bookinstance');
const ObjectId = require('mongoose').Types.ObjectId;
const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');

// Book list
exports.book_list = function(req, res) {
    bookModel.find({}, 'title author')
        .populate('author')
        .exec((err, data) => {
            if (err) return next(err);
            res.render('book_list', {title: 'Book List', book_list: data});
        });
};

// Book show
exports.book_show = function(req, res, next) {
    async.parallel({
        book: function(callback) {
            bookModel.findById(req.params.book_id)
                .populate('author')
                .populate('genre')
                .exec(callback);
        },
        bookinstances: function(callback) {
            bookinstanceModel.find({book: ObjectId(req.params.book_id)}, callback);
        }
    }, function(err, results) {
        if (err) return next(err);
        if (results == null || results.book == null) {
            err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        res.render('book_detail',
            {title: 'Title', book: results.book, bookinstances: results.bookinstances}
        );
    });
};

// Book new
exports.book_new = function(req, res) {
    async.parallel({
        authors: function(callback) {
            authorModel.find({}, callback);
        },
        genres: function(callback) {
            genreModel.find({}, callback);
        }
    }, function(err, results) {
        if (err) return next(err);
        res.render('book_new', {title: 'Create Book', authors: results.authors, genres: results.genres});
    });
};

// Book create
exports.book_create = [
    (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.redirect('/catalog/books/');
        }
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined') {
                req.body.genre = [];
            } else {
                req.body.genre = new Array(req.body.genre);
            }
        }
        next();
    },

    // Validate fields
    body('title', 'Title must not be empty.').trim().isLength({min: 1}),
    body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
    body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
    body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

    // Sanitize fields
    sanitizeBody('*').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            async.parallel({
                authors: function (callback) {
                    authorModel.find(callback);
                },
                genres: function (callback) {
                    genreModel.find(callback);
                },
            }, function (err, results) {
                if (err) { return next(err); }
                for (let genreId of req.body.genre) {
                    for (let genre of results.genres) {
                        if (genre.id === genreId) {
                            genre.checked = true;
                        }
                    }
                }
                return res.render('book_new', {title: 'Create book', authors: results.authors, genres: results.genres, errors: errors.array()});
            });
        } else {
            bookModel.create(req.body, (err, data) => {
                if (err) next(err);
                res.redirect('/catalog/books');
            });
        }
    }
];

// Book delete form
exports.book_delete_form = function(req, res) {
    async.parallel({
        book: function(callback) {
            bookModel.findById(req.params.book_id).populate('author').populate('genre').exec(callback);
        },
        book_bookinstances: function(callback) {
            bookinstanceModel.find({ 'book': req.params.book_id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            res.redirect('/catalog/books');
        }
        res.render('book_delete', { title: 'Delete Book', book: results.book, book_instances: results.book_bookinstances } );
    });
};

// Book delete
exports.book_delete = function(req, res, next) {
    async.parallel({
        book: function(callback) {
            bookModel.findById(req.params.book_id).populate('author').populate('genre').exec(callback);
        },
        book_bookinstances: function(callback) {
            bookinstanceModel.find({ 'book': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book_bookinstances.length > 0) {
            return res.render('book_delete', { title: 'Delete Book', book: results.book, book_instances: results.book_bookinstances } );
        }
        else {
            bookModel.findByIdAndRemove(req.params.book_id, (err) => {
                if (err) { return next(err); }
                res.redirect('/catalog/books');
            });
        }
    });
};

// Book edit
exports.book_edit = function(req, res, next) {
    async.parallel({
        book: function(callback) {
            bookModel.findById(req.params.book_id, callback);
        },
        authors: function (callback) {
            authorModel.find(callback);
        },
        genres: function (callback) {
            genreModel.find(callback);
        },
    }, function (err, results) {
        if (err) return next(err);
        if (results.book === null) {
            err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        for (let genreId of results.book.genre) {
            for (let genre of results.genres) {
                if (genreId.equals(genre._id)) {
                    genre.checked = true;
                }
            }
        }
        return res.render('book_edit', {title: 'Edit book', authors: results.authors, genres: results.genres, book: results.book});
    });
};

// Book update
exports.book_update = [
    (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.redirect('/catalog/books/');
        }
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined') {
                req.body.genre = [];
            } else {
                req.body.genre = new Array(req.body.genre);
            }
        }
        next();
    },

    // Validate fields
    body('title', 'Title must not be empty.').trim().isLength({min: 1}),
    body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
    body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
    body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

    // Sanitize fields
    sanitizeBody('*').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            async.parallel({
                book: function(callback) {
                    bookModel.findById(req.params.book_id, callback);
                },
                authors: function (callback) {
                    authorModel.find(callback);
                },
                genres: function (callback) {
                    genreModel.find(callback);
                },
            }, function (err, results) {
                console.log('Book id: ' + req.params.book_id);
                if (err) {
                    return next(err);
                }
                for (let genreId of req.body.genre) {
                    for (let genre of results.genres) {
                        if (genre.id === genreId) {
                            genre.checked = true;
                        }
                    }
                }
                return res.render('book_edit', {
                    title: 'Edit book',
                    authors: results.authors,
                    genres: results.genres,
                    errors: errors.array(),
                    book: results.book
                });
            });
        } else {
            bookModel.findByIdAndUpdate(req.params.book_id, req.body, (err, data) => {
                if (err) next(err);
                res.redirect('/catalog/books');
            });
        }
    }
];
