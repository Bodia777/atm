const express = require('express');

const { postCards, getCards, deleteCards } =require('../controllers/cards-controller');


const router = express.Router();
router.post('/', postCards);
router.get('/', getCards);
router.delete('/', deleteCards);

module.exports = router;