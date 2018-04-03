const bookModel = require('../models/book');

// Book list
exports.book_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Book list');
};

// Book show
exports.book_show = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
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