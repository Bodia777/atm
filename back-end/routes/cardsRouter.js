const express = require('express');

const { postCards, getCards } =require('../controllers/cards-controller');


const router = express.Router();
router.post('/', postCards);
router.get('/', getCards);

module.exports = router;