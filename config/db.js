const mysql = require('mysql2');

// Koneksi ke database
const db = mysql.createConnection({
    host: 'mysql-24328727-rakaramadhani2001-3edc.b.aivencloud.com',
    port: '21231',
    user: 'avnadmin',
    password: 'AVNS__doTwUnZqflhyrupKy3',
    database: 'PengelolaanPerumahan',
    connectTimeout: 10000,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
