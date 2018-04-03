const authorModel = require('../models/author');

// Author home (list of authors)
exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

// Author show
exports.author_show = function(req, res) {
    res.send('NOT IMPLEMENTED: Show author ' + req.params.author_id);
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
