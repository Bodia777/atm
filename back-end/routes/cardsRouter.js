const express = require('express');

const { postCard } =require('../controllers/cards-controller');


const router = express.Router();
// router.get('/one', getCard);
// router.get('/many', getCards);
router.post('/', postCard);

module.exports = router;