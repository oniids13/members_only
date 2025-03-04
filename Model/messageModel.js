const pool = require('../config/pool');

const getAllMsg = async () => {
    const query = 'SELECT messages.id, messages.title, messages.body, messages.created_at, users.fullname FROM messages JOIN users ON messages.user_id = users.id ORDER BY created_at DESC';
    
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}




module.exports = { getAllMsg};