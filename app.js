const path = require('node:path');
const express = require('express');
const session = require('express-session');
var passport = require('passport')
const pgPool = require('./config/pool');
const pgSession = require('connect-pg-simple')(session);

require('./config/passport');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Creating session setup
app.use(session({
    store: new pgSession({
        pool: pgPool,
        tableName: 'user_sessions'
    }),
    secret: 'members_only',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24}
}));


// Passport authentication
app.use(passport.initialize());
app.use(passport.session);

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})

// Routes



// Server

app.listen(3000, () => {
    console.log('http://localhost:3000')
})