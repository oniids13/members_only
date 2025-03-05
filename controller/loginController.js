const passport = require('passport');


const getLogin = (req, res) => {
    res.render('login.ejs', {error: null});
}

const loginAuth = (req, res, next) => {


    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication Error:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication Failed');
            return res.render('login', {error: 'Incorrect Email/Password. Please Try again.'});
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login Error:', err);
                return next(err);
            }
            return res.redirect('/login/success');
        });
    })(req,res, next);
};


const loginSuccess = (req, res) => {
    res.redirect('/');
}


module.exports = { getLogin, loginAuth, loginSuccess }
