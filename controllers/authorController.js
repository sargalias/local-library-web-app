const async = require('async');
const authorModel = require('../models/author');
const bookModel = require('../models/book');
const ObjectId = require('mongoose').Types.ObjectId;

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
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Author create
exports.author_create = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

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
