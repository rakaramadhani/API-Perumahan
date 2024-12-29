const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO User (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'User registered successfully!' });
        }
    );
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM User WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const token = jwt.sign({ id: user.ID_Rumah, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        });

        res.json({ message: 'Login successful', token });
    });
});

module.exports = router;
