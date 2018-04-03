const express = require('express');
const indexController = require('../controllers/indexController');
const async = require('async');

const router = express.Router();


// Catalog index
router.get('/', indexController.index);

module.exports = router;