const express = require('express'); // Pastikan ini ada
const authenticateToken = require('../middleware/authenticate'); // Pastikan ini ada
const db = require('../config/db'); // Pastikan ini ada
const router = express.Router(); // Inisialisasi router

// CRUD Pengaduan (Hanya untuk penghuni)
router.get('/pengaduan', authenticateToken, (req, res) => {
    if (req.user.role !== 'Penghuni') {
        return res.status(403).json({ message: 'Access restricted to penghuni only' });
    }

    db.query('SELECT * FROM Pengaduan WHERE ID_Rumah = ?', [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
    });

router.post('/pengaduan', authenticateToken, (req, res) => {
    if (req.user.role !== 'Penghuni') {
        return res.status(403).json({ message: 'Access restricted to penghuni only' });
    }
    
        const { kategori_masalah, deskripsi } = req.body;
    
        db.query(
        'INSERT INTO Pengaduan (ID_Rumah, kategori_masalah, deskripsi) VALUES (?, ?, ?)',
        [req.user.id, kategori_masalah, deskripsi],
        (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({ message: 'Pengaduan created successfully' });
        }
        );
    });

router.put('/pengaduan/:id', authenticateToken, (req, res) => {
    if (req.user.role !== 'Penghuni') {
        return res.status(403).json({ message: 'Access restricted to penghuni only' });
    }

    const { kategori_masalah, deskripsi } = req.body;

    db.query(
        'UPDATE Pengaduan SET kategori_masalah = ?, deskripsi = ? WHERE ID_Pengaduan = ? AND ID_Rumah = ?',
        [kategori_masalah, deskripsi, req.params.id, req.user.id],
        (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Pengaduan updated successfully' });
        }
    );
});

router.delete('/pengaduan/:id', authenticateToken, (req, res) => {
    if (req.user.role !== 'Penghuni') {
        return res.status(403).json({ message: 'Access restricted to penghuni only' });
    }

    db.query(
        'DELETE FROM Pengaduan WHERE ID_Pengaduan = ? AND ID_Rumah = ?',
        [req.params.id, req.user.id],
        (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Pengaduan deleted successfully' });
        }
    );
    });

module.exports = router;