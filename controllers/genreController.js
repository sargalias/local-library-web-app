const genreModel = require('../models/genre');

// Genre list
exports.genre_list = function(req, res) {
    genreModel.find()
        .sort({name: 1})
        .exec((err, data) => {
            if (err) return next(err);
            res.render('genre_list',
                {title: 'Genre List', genre_list: data});
        })
};

// Genre show
exports.genre_show = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
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