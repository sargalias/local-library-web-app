const express = require('express');
const bookController = require('../controllers/bookController');
const async = require('async');

const router = express.Router();


// ROUTES

// Index
router.get('/', bookController.book_list);

// New
router.get('/new', bookController.book_new);

// Create
router.post('/', bookController.book_create);

// Show
router.get('/:book_id', bookController.book_show);

// Edit
router.get('/:book_id/edit', bookController.book_edit);

// Update
router.put('/:book_id', bookController.book_update);

// Delete
router.delete('/:book_id', bookController.book_delete);

// Delete form
router.get('/:book_id/delete', bookController.book_delete_form);



module.exports = router;