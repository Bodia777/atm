const express = require('express');
const db = require('../db.config');

const router = express.Router();



router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, rows, fields) =>{
        if (err) {
            console.log(err);
            throw err;
        } else {
            console.log('get works');
            console.log(rows, 'rows');
            console.log(fields, 'fields');
            res.send('get works');
        }
    })
})

module.exports = router;