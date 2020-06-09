const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const mailConfirmationRouter = require('./routes/mailConfirmationRouter');
const loginRouter = require('./routes/loginRouter');


let app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/mailConfirmation', mailConfirmationRouter);
app.use('/login', loginRouter);

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