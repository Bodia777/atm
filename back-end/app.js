const express = require('express');
const cors = require('cors');

const tableDBGeneration = require('./config/tableDBGenerator');
const db = require('./config/db.config');
const authRouter = require('./routes/authRouter');
const mailConfirmationRouter = require('./routes/mailConfirmationRouter');


let app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/mailConfirmation', mailConfirmationRouter)

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use('/heroes', heroesRouter);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status=404;
    error.message = 'wrong href';
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error, 'ERROR<<<<<');
 res.status(error.status || 500);
 res.json({
     error: {message: error.message}
    })
});

module.exports = app;

// app.listen(3000, () => {
//     console.log(`
//     ================Server=================
//       host : localhost
//       port : 3000
//     =======================================
//     `)
// });

// try{
//     db.connect();
// } catch(e) {
//     console.log(e, 'ERROR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
// }