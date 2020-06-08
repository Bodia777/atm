const express = require('express');

const {confirmEmail} =require('../controllers/users-controller');


const router = express.Router();

router.get('/', confirmEmail);

module.exports = router;