const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();


// ROUTES

// Index
router.get('/', genreController.genre_list);

// New
router.get('/new', genreController.genre_new);

// Create
router.post('/', genreController.genre_create);

// Show
router.get('/:author_id', genreController.genre_show);

// Edit
router.get('/:author_id', genreController.genre_edit);

// Update
router.update('/:author_id', genreController.genre_update);

// Delete
router.delete('/:author_id', genreController.genre_delete());

// Delete form
router.get('/:author_id/delete', genreController.genre_delete_form);



module.exports = router;