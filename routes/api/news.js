const express = require('express');
const router = express.Router();
const {getNews} = require('../../controllers/newsController');

router.post('/', getNews);

module.exports = router;
