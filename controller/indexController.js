const pool = require('../config/pool')


const getIndex = (req, res) => {
    res.render('index')
}




module.exports = { getIndex }