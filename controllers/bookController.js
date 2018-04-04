const bookModel = require('../models/book');
const bookinstanceModel = require('../models/bookinstance');
const ObjectId = require('mongoose').Types.ObjectId;
const async = require('async');

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
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Book create
exports.book_create = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Book delete form
exports.book_delete_form = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Book delete
exports.book_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Book edit
exports.book_edit = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Book update
exports.book_update = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};