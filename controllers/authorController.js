const async = require('async');
const authorModel = require('../models/author');
const bookModel = require('../models/book');
const ObjectId = require('mongoose').Types.ObjectId;
const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');

// Author home (list of authors)
exports.author_list = function(req, res) {
    authorModel.find({})
        .sort({'family_name': 1})
        .exec((err, data) => {
            if (err) return next(err);
            res.render('author_list', {title: 'Author list', author_list: data});
        });
};

// Author show
exports.author_show = function(req, res, next) {
    async.parallel({
        author: function(callback) {
            authorModel.findById(req.params.author_id, callback);
        },
        books: function(callback) {
            bookModel.find({author: ObjectId(req.params.author_id)}, callback)
        }
    }, function(err, results) {
        if (err) return next(err);
        if (results.author == null) {
            err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        res.render('author_detail',
            {title: 'Author', author: results.author, books: results.books});
    });
};

// Author new
exports.author_new = function(req, res) {
    res.render('author_new', {title: 'Create Author'});
};

// Author create
exports.author_create = [
    // Validate fields
    body('first_name')
        .trim().isLength({min: 1}).withMessage('First name is required.')
        .isAlpha().withMessage('First name has non-alphanumeric characters.'),
    body('family_name')
        .trim().isLength({min: 1}).withMessage('Last name is required.')
        .isAlpha().withMessage('Last name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth')
        .optional({checkFalsy: true}).isISO8601()
        .isBefore().withMessage('Date has to be in the past'),
    body('date_of_death', 'Invalid date of death')
        .optional({checkFalsy: true}).isISO8601()
        .isBefore().withMessage('Date has to be in the past')
        .custom((value, {req}) => {
            if (req.body.date_of_birth) {
                return req.body.date_of_birth < value;
            }
            return false;
        }).withMessage('Date of birth must be before date of death'),

    // Sanitize fields
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

    // Next function
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('author_new', {title: 'Create author', author: req.body, errors: errors.array()})
        }
        const authorInfo = matchedData(req);
        authorModel.findOne({first_name: authorInfo.first_name, family_name: authorInfo.family_name}, (err, data) => {
            if (err) return next(err);
            if (data !== null) {
                return res.redirect('/catalog/authors');
            }
            authorModel.create(authorInfo, (err, data) => {
                if (err) return next(err);
                return res.redirect('/catalog/authors');
            });
        });
    }
];

// Author delete page
exports.author_delete_form = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Author delete
exports.author_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Author edit
exports.author_edit = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Author update
exports.author_update = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};

