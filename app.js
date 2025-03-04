const path = require('node:path');
const express = require('express');
const session = require('express-session');
var passport = require('passport')
const pgPool = require('./config/pool');
const pgSession = require('connect-pg-simple')(session);
const indexRouter = require('./routes/indexRouter')
const signUpRouter = require('./routes/signUpRouter');
const loginRouter = require('./routes/loginRouter');
const secretRouter = require('./routes/secretRouter');

require('./config/passport');

const app = express();
const assetsPath = path.join(__dirname, 'public');


app.use(express.static(assetsPath))
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
app.use(passport.session());

// app.use((req, res, next) => {
//     console.log(req.session);
//     console.log(req.user);
//     next();
// })
app.use((req, res, next) => {
    res.locals.isLogged = req.isAuthenticated();
    res.locals.user = req.user;
    next();
})



// Routes
app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
app.use('/secret', secretRouter);

// Logging out
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    })
})



// Server

app.listen(3000, () => {
    console.log('http://localhost:3000')
})