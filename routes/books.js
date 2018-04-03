const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();


// ROUTES

// Index
router.get('/', bookController.book_list);

// New
router.get('/new', bookController.book_new);

// Create
router.post('/', bookController.book_create);

// Show
router.get('/:author_id', bookController.book_show);

// Edit
router.get('/:author_id/edit', bookController.book_edit);

// Update
router.put('/:author_id', bookController.book_update);

// Delete
router.delete('/:author_id', bookController.book_delete);

// Delete form
router.get('/:author_id/delete', bookController.book_delete_form);



module.exports = router;