module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json( { msg: 'You are not authorized.'});
    }
};


module.exports.isMember = (req, res, next) => {
    if (req.isAuthenticated() && (req.membership_status === 'member')) {
        next();
    } else {
        res.status(401).json( {msg: 'You are not authorized.'})
    }
}