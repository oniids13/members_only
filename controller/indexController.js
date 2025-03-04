const {getAllMsg} = require('../Model/messageModel')


const getIndex = async (req, res) => {

    const allMsg =  await getAllMsg();



    res.render('index', {allMsg})
};




module.exports = { getIndex }