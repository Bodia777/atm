const express = require('express');

const passport = require('passport');


const router = express.Router();


router.post('/', (req, res, next) => {
    passport.authenticate('localStrategy',
        (err, user, info) => {
        if (err) {
            return res.status(404).json(err.message);
        }
        req.logIn(user, (err) => {
            if (err) { 
               return res.status(404).json(err.message); 
            }
            return res.status(201).json('login confirmed');
        })
    }
    ) (req, res, next);
});

module.exports = router;