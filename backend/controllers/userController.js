const db = require('../db');

const getUsers = async (req, res) => {
    try {
        const users = await db.any('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = await db.one(
            'INSERT INTO users(username, email) VALUES($1, $2) RETURNING *',
            [username, email]
        );
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getUsers, createUser };
