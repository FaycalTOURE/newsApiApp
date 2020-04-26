const express = require('express');
const router = express.Router();
const news = require('../../controllers/newsController');

router.post('/', news.getNews);

module.exports = router;
