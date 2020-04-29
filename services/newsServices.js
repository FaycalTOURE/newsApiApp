const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('2fdd5376bdfe4c56929d6f07c5a2e4ac');

let getNews = async (req, res) => {
    console.log(req.body.requestLanguage, req.body.requestQuery, req.body.requestSource);
    newsapi.v2.topHeadlines({
        sources: req.body.requestSource,
        q: req.body.requestQuery,
        language: req.body.requestLanguage
    }).then(result => {
        res.status(200).send(result);
    });
};

module.exports = {
    getNews
};
