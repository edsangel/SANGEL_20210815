const express = require('express');
const { getCategories, createCategory } = require('../controllers/video-category');
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);

module.exports = router;
