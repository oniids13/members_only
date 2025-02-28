const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./pool');
const { validPassword } = require('../lib/passwordUtil');

const verifyCallback = async (username, password, done) => {
    try {
        const {rows} = await pool.query('SELECT * FROM users WHERE email = $1', [username]);
        const user = rows[0];

        if (!user) {
            return done(null, false);
        }

        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err);
    }
}


const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const {rows} = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = rows[0];

        done(null, user);
    } catch(err) {
        done(err);
    }
});