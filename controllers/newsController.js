const express = require('express');
const router = express.Router();
const {getNews} = require('../services/newsServices');

router.post('/', getNews);

module.exports = router;
