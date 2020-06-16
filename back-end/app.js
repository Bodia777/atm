const express = require('express');
const cors = require('cors');
const session = require('express-session');

require('./passport-strategies/local-strategy');
const passport = require('passport');

const authRouter = require('./routes/authRouter');
const mailConfirmationRouter = require('./routes/mailConfirmationRouter');
const loginRouter = require('./routes/loginRouter');


let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/mailConfirmation', mailConfirmationRouter);
app.use('/login', loginRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status=404;
    console.log('error 404');
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