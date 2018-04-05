const bookinstanceModel = require('../models/bookinstance');
const bookModel = require('../models/book');
const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');

// Bookinstance list
exports.bookinstance_list = function(req, res) {
    bookinstanceModel.find({})
        .populate('book')
        .exec(function(err, data) {
        if (err) return next(err);
        res.render('bookinstance_list',
            {title: 'Book Instance List', bookinstance_list: data});
    });
};

// Bookinstance show
exports.bookinstance_show = function(req, res, next) {
    bookinstanceModel.findById(req.params.bookinstance_id)
        .populate('book')
        .exec((err, data) => {
            if (err) next(err);
            if (data == null) {
                err = new Error('Book Instance not found');
                err.status = 404;
                return next(err);
            }
            res.render('bookinstance_detail',
                {title: 'ID', bookinstance: data});
        });
};

// Bookinstance new
exports.bookinstance_new = function(req, res) {
    bookModel.find({}, (err, data) => {
        if (err) return next(err);
        res.render('bookinstance_new', {title: 'Create BookInstance', book_list: data, statusValues: bookinstanceModel.schema.path('status').enumValues});
    });
};

// Bookinstance create
exports.bookinstance_create = [
    // Validate fields
    body('book', 'Book is required').trim().isLength({min: 1}),
    body('imprint', 'Imprint is required').trim().isLength({min: 1}),
    body('due_back', 'Invalid date').optional({checkFalsy: true}).isISO8601(),
    body('status', 'Status is required').trim().isLength({min: 1}),

    // Sanitize fields
    sanitizeBody('book').trim().escape(),
    sanitizeBody('imprint').trim().escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('due_back').toDate(),


    (req, res, next) => {
        const errors = validationResult(req);
        const data = matchedData(req);
        const bookinstance = new bookinstanceModel({
            book: data.book,
            imprint: data.imprint,
            status: req.body.status,
            due_back: data.due_back
        });

        if (!errors.isEmpty()) {
            bookModel.find({}, (err, data) => {
                if (err) return next(err);
                return res.render('bookinstance_new', {
                    title: 'Create BookInstance',
                    book_list: data,
                    statusValues: bookinstanceModel.schema.path('status').enumValues,
                    bookinstance: bookinstance,
                    errors: errors.array()
                });
            });
        } else {
            bookinstance.save((err) => {
                if (err) return next(err);
                res.redirect('/catalog/bookinstances');
            })
        }
    }
];

// Bookinstance delete form
exports.bookinstance_delete_form = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Bookinstance delete
exports.bookinstance_delete = function(req, res, next) {
    bookinstanceModel.findByIdAndRemove(req.params.bookinstance_id, (err) => {
        if (err) return next(err);
        res.redirect('/catalog/bookinstances');
    });
};

// Bookinstance edit
exports.bookinstance_edit = function(req, res, next) {
    async.parallel({
        book_list: function(callback) {
            bookModel.find({}, callback);
        },
        bookinstance: function(callback) {
            bookinstanceModel.findById(req.params.bookinstance_id, callback);

        }
    }, function(err, results) {
        if (err) return next(err);
        if (results.bookinstance === null) {
            err = new Error('BookInstance not found');
            err.status = 404;
            return next(err);
        }
        res.render('bookinstance_edit', {
            title: 'Update BookInstance',
            book_list: results.book_list,
            bookinstance: results.bookinstance,
            statusValues: bookinstanceModel.schema.path('status').enumValues
        });
    });
};

// Bookinstance update
exports.bookinstance_update = [
    // Validate fields
    body('book', 'Book is required').trim().isLength({min: 1}),
    body('imprint', 'Imprint is required').trim().isLength({min: 1}),
    body('due_back', 'Invalid date').optional({checkFalsy: true}).isISO8601(),
    body('status', 'Status is required').trim().isLength({min: 1}),

    // Sanitize fields
    sanitizeBody('book').trim().escape(),
    sanitizeBody('imprint').trim().escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('due_back').toDate(),


    (req, res, next) => {
        const errors = validationResult(req);
        const data = matchedData(req);
        const bookinstance = new bookinstanceModel({
            book: data.book,
            imprint: data.imprint,
            status: req.body.status,
            due_back: data.due_back
        });

        if (!errors.isEmpty()) {
            bookModel.find({}, (err, book_list) => {
                if (err) return next(err);
                async.parallel({
                    book_list: function(callback) {
                        bookModel.find({}, callback);
                    },
                    bookinstance: function(callback) {
                        bookinstanceModel.findById(req.params.bookinstance_id, callback);

                    }
                }, function(err, results) {
                    if (err) return next(err);
                    if (results.bookinstance === null) {
                        err = new Error('BookInstance not found');
                        err.status = 404;
                        return next(err);
                    }
                    return res.render('bookinstance_edit', {
                        title: 'Update BookInstance',
                        book_list: results.book_list,
                        bookinstance: results.bookinstance,
                        statusValues: bookinstanceModel.schema.path('status').enumValues,
                        errors: errors.array()
                    });
                });
            });
        } else {
            bookinstanceModel.findByIdAndUpdate(req.params.bookinstance_id, {
                book: data.book,
                imprint: data.imprint,
                status: req.body.status,
                due_back: data.due_back
            }, (err, data) => {
                if (err) return next(err);
                res.redirect('/catalog/bookinstances');
            })
        }
    }
];