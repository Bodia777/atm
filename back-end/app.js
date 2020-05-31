const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// const heroesRouter = require('./routes/heroesRouter');
// const morgan = require('morgan');
let app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'LV123!',
    database: 'atm',
});
db.connect((error) => {
    if (error) {
        console.log(error);
        throw error;
    } else {
        console.log('db works...');
        
    }

})

app.get('/db', (req,res) => {
    db.query(sql, (err, result) =>{
        if (err) throw err;
        console.log(result);
        res.send('get works')
    })
})

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use('/heroes', heroesRouter);
// app.use((req, res, next) => {
    // const error = new Error('Not found');
    // error.status=404;
    // error.message = 'wrong href';
    // next(error);
// });

// app.use((error, req, res, next) => {
//     console.log(error, 'ERROR<<<<<');
//  res.status(error.status || 500);
//  res.json({
//      error: {message: error.message}
//     })
// });

app.listen(3000, () => {
    console.log('listening3000...')
});
