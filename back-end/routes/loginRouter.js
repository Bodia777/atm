const express = require('express');

const { confirmLogIn } =require('../controllers/users-controller');


const router = express.Router();
router.patch('/', confirmLogIn);

module.exports = router;