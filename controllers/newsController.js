// const language = ["fr", "de", "en", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "se", "ud", "zh"];
//
// const sources = ["ABC News (AU)", "Aftenposten", "Al Jazeera English", "ANSA.it", "Argaam",
//      "Ars Technica", "Ary News", "Associated Press", "Australian Financial Review", "Axios",
//      "BBC News","BBC Sport","Bild","Blasting News (BR)","Bleacher Report","Bloomberg","Breitbart News",
//      "Business Insider","Business Insider (UK)","Buzzfeed","CBC News","CBS News","CNBC","CNN","CNN Spanish",
//      "Crypto Coins News","Der Tagesspiegel","Die Zeit","El Mundo","Engadget","Entertainment Weekly","ESPN",
//      "ESPN Cric Info","Financial Post","Focus","Football Italia","Fortune","FourFourTwo","Fox News","Fox Sports",
//      "Globo","Google News","Google News (Argentina)","Google News (Australia)","Google News (Brasil)",
//      "Google News (Canada)","Google News (France)","Google News (India)","Google News (Israel)",
//      "Google News (Italy)","Google News (Russia)","Google News (Saudi Arabia)","Google News (UK)",
//      "Göteborgs-Posten","Gruenderszene","Hacker News","Handelsblatt","IGN","Il Sole 24 Ore","Independent",
//      "Infobae","InfoMoney","La Gaceta","La Nacion","La Repubblica","Le Monde","Lenta","L'equipe","Les Echos",
//      "Libération","Marca","Mashable","Medical News Today","MSNBC","MTV News","MTV News (UK)","National Geographic",
//      "National Review","NBC News","News24","New Scientist","News.com.au","Newsweek","New York Magazine","Next Big Future",
//      "NFL News","NHL News","NRK","Politico","Polygon","RBC","Recode","Reddit /r/all","Reuters","RT","RTE","RTL Nieuws","SABQ","Spiegel Online","Svenska Dagbladet","T3n","TalkSport,
//     "TechCrunch","TechCrunch (CN)","TechRadar","The American Conservative","The Globe And Mail","The Hill","The Hindu","The Huffington Post","The Irish Times",
//      "The Jerusalem Post","The Lad Bible","The Next Web","The Sport Bible","The Times of India","The Verge","The Wall Street Journal","The Washington Post",
//      "The Washington Times","Time","USA Today","Vice News","Wired","Wired.de","Wirtschafts Woche","Xinhua Net","Ynet"
// ];


const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('2fdd5376bdfe4c56929d6f07c5a2e4ac');

exports.getNews = async (req, res) => {
    newsapi.v2.topHeadlines({
        sources: req.body.requestSource,
        q: req.body.requestQuery,
        language: req.body.requestLanguage
    }).then(result => {
        res.status(200).send(result);
    });
};