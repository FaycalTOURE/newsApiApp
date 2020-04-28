require('dotenv').config();
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const cookiesService = require('./services/cookies.service');

// Routes
const favorite = require('./routes/api/favorite');

const {setAuthentication} = require('./services/auth.service');
const mongoDB = require('./services/db.service');


const port = process.env.PORT || 3000;
const server = express();
server.use(cors());

/* server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

class ServerClass {
    init() {
        server.set('views', __dirname + '/views');
        server.engine('.hbs', exphbs({extname: '.hbs'}));
        server.set('view engine', '.hbs');
       // server.use(express.static(path.join(__dirname, 'www')));
        server.use(bodyParser.json({limit: '10mb'}));
        server.use(bodyParser.urlencoded({extended: true}));

        server.use(cookieParser(process.env.COOKIE_SECRET));

        setAuthentication(passport);

        this.launch();
    };

    routes() {
        server.get('/', (req, res) => res.render('home'));
        server.use('/api/favorite', favorite);
        server.use('/api/news', require('./controllers/newsController'));
        server.use('/api/auth', require('./controllers/auth/AuthController'));
    };

    launch() {
        this.routes();

        mongoDB.initClient()
            .then(db => {
                server.listen(port, () => {
                    console.log(`Server is running on port ${port}`)
                });
            })
            .catch(mongooseError => console.log(mongooseError));
    };
}

new ServerClass().init();

