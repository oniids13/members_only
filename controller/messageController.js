const e = require('express');
const pool =  require('../config/pool');



const getMessageForm = (req, res) => {
    res.render('messageForm');
}

const postMessage = async (req, res) => {

    const { title, body } = req.body;
    const userId = req.user.id;

    const query = 'INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3)';
    const values = [userId, title, body];

    try {
        await pool.query(query, values);
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }
}

const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM messages WHERE id=$1';
        const value = [id];

        await pool.query(query,value);
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }

}


module.exports = { getMessageForm, postMessage, deleteMessage }