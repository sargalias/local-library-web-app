const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();


// ROUTES

// Index
router.get('/', authorController.index);

// New
router.get('/new', authorController.author_new);

// Create
router.post('/', authorController.author_create);

// Show
router.get('/:author_id', authorController.show_author);

// Edit
router.get('/:author_id', authorController.author_edit);

// Update
router.update('/:author_id', authorController.author_update);

// Delete
router.delete('/:author_id', authorController.author_delete);

// Delete form
router.get('/:author_id/delete', authorController.author_delete_form);



module.exports = router;