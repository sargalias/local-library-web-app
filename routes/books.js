const express = require('express');
const bookController = require('../controllers/bookinstanceController');

const router = express.Router();


// ROUTES

// Index
router.get('/', bookController.bookinstance_list);

// New
router.get('/new', bookController.bookinstance_new);

// Create
router.post('/', bookController.bookinstance_create);

// Show
router.get('/:author_id', bookController.bookinstance_show);

// Edit
router.get('/:author_id', bookController.bookinstance_edit);

// Update
router.put('/:author_id', bookController.bookinstance_update);

// Delete
router.delete('/:author_id', bookController.bookinstance_delete);

// Delete form
router.get('/:author_id/delete', bookController.bookinstance_delete_form);



module.exports = router;