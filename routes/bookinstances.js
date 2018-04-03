const express = require('express');
const bookinstanceController = require('../controllers/bookinstanceController');
const async = require('async');

const router = express.Router();


// ROUTES

// Index
router.get('/', bookinstanceController.bookinstance_list);

// New
router.get('/new', bookinstanceController.bookinstance_new);

// Create
router.post('/', bookinstanceController.bookinstance_create);

// Show
router.get('/:bookinstance_id', bookinstanceController.bookinstance_show);

// Edit
router.get('/:bookinstance_id/edit', bookinstanceController.bookinstance_edit);

// Update
router.put('/:bookinstance_id', bookinstanceController.bookinstance_update);

// Delete
router.delete('/:bookinstance_id', bookinstanceController.bookinstance_delete);

// Delete form
router.get('/:bookinstance_id/delete', bookinstanceController.bookinstance_delete_form);



module.exports = router;