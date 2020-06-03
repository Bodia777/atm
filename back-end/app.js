const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const db = require('./db.config');

const authRouter = require('./routes/authRouter');


let app = express();

app.use(cors());
app.use(express.json());


db.connect((error) => {
    if (error) {
        console.log(error);
        throw error;
    } else {
        console.log('db works...');
        
    }

})

app.use('/auth', authRouter)



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
