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
router.get('/:genre_id', genreController.genre_show);

// Edit
router.get('/:genre_id/edit', genreController.genre_edit);

// Update
router.put('/:genre_id', genreController.genre_update);

// Delete
router.delete('/:genre_id', genreController.genre_delete);

// Delete form
router.get('/:genre_id/delete', genreController.genre_delete_form);



module.exports = router;