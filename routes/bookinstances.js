const express = require('express');
const bookinstanceController = require('../controllers/bookinstanceController');

const router = express.Router();


// ROUTES

// Index
router.get('/', bookinstanceController.bookinstance_list);

// New
router.get('/new', bookinstanceController.bookinstance_new);

// Create
router.post('/', bookinstanceController.bookinstance_create);

// Show
router.get('/:author_id', bookinstanceController.bookinstance_show);

// Edit
router.get('/:author_id', bookinstanceController.bookinstance_edit);

// Update
router.update('/:author_id', bookinstanceController.bookinstance_update);

// Delete
router.delete('/:author_id', bookinstanceController.bookinstance_delete);

// Delete form
router.get('/:author_id/delete', bookinstanceController.bookinstance_delete_form);



module.exports = router;