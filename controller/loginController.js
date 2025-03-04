const passport = require('passport');


const getLogin = (req, res) => {
    res.render('login.ejs');
}

const loginAuth = (req, res, next) => {


    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication Error:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication Failed');
            return res.redirect('/login/failure');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login Error:', err);
                return next(err);
            }
            console.log('User logged in: ', user);
            return res.redirect('/login/success');
        });
    })(req,res, next);
};

const loginFail = (req, res) => {
    res.send('You entered the wrong password');
}

const loginSuccess = (req, res) => {
    res.redirect('/');
}


module.exports = { getLogin, loginAuth, loginFail, loginSuccess }
