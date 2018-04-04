const bookinstanceModel = require('../models/bookinstance');

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
    res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// Bookinstance create
exports.bookinstance_create = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
};

// Bookinstance delete form
exports.bookinstance_delete_form = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Bookinstance delete
exports.bookinstance_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Bookinstance edit
exports.bookinstance_edit = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Bookinstance update
exports.bookinstance_update = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};