const db = require('../config/db.config');

module.exports = {
    postCards: async (req, res, next) => {
        const userId = + req.body.user_ID;
        const belongingToTheBank = +req.body.belonging_to_The_Bank;
        console.log(userId, 'userId');
        console.log(belongingToTheBank, 'belongingToTheBank');
        try {
            const newCardNumber = await getCardNumber();
            let month = (new Date().getMonth() + 1).toString();
            if (month.length === 1) month = '0' + month;
            const year = (new Date().getFullYear() + 2).toString().slice(2,4);
            const date = month + ' ' + year;
            const connection = await db.get();
            const sql = `INSERT INTO cards (user_card_id, card_number, card_date, belonging_to_The_Bank) 
                    VALUE ('${userId}', '${newCardNumber}', '${date}', '${belongingToTheBank}')`;
            await connection.execute(sql);
            const  newCard  = await getCard(newCardNumber);
            res.status(201).json(newCard);
        } catch (err) {
            if (err.errno = 1062) {
                res.status(403).json({
                    message: `ERROR: ${err.sqlMessage}`
                });
                console.log(err.sqlMessage, err.errno, 'error<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            }
        }
    },
    getCards: async (req, res, next) => {
        const userId = + req.query.userId;
        console.log(userId, 'getCardsUserId');
        try{
            const connection = await db.get();
            const sql = `SELECT card_number, card_date, belonging_to_The_Bank FROM cards WHERE user_card_id = ${userId}`;
            const [ cards ] = await connection.execute(sql);
            console.log(cards, 'cards in getCards');
            res.status(200).json(cards);
        } catch (err) {
            if (err.errno = 1062) {
                res.status(403).json({
                    message: `ERROR: ${err.sqlMessage}`
                });
                console.log(err.sqlMessage, err.errno, 'error<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            }
        }
    }
}

async function getCardNumber() {
    try{
        const connection = await db.get();
        const sql = `SELECT MAX(card_ID) as maxCardId FROM cards`;
        const [ [ {maxCardId} = result ] ] = await connection.execute(sql);
        if(!maxCardId) {
            return '0000 0000 0000 0001';
        } else {
            const sql2 = `SELECT card_number as oldCardNumber FROM cards WHERE card_ID = ${maxCardId}`;
            const [ [ { oldCardNumber } = result] ] =  await connection.execute(sql2);
            const cardNumberArr = oldCardNumber.split(' ');
            const newCardResult = setCardNumber(cardNumberArr, changeNumberInArr = 3);
            return newCardResult;
        }
    } catch (e) {
         console.log(e, 'cardNumberError');
    }
}

function setCardNumber(cardNumberArr, changeNumberInArr) {
    cardNumberArr[changeNumberInArr] = + cardNumberArr[changeNumberInArr] + 1;
    if (cardNumberArr[changeNumberInArr] === 10000 && changeNumberInArr === 0) {
        throw new Error(message, 'atm Database is full. Cards numbers are full');
    }
    if (cardNumberArr[changeNumberInArr] === 10000) {
        cardNumberArr[changeNumberInArr] = '0000';
        setCardNumber(cardNumberArr, (changeNumberInArr - 1));
    }
    cardNumberArr[changeNumberInArr] = cardNumberArr[changeNumberInArr].toString();
    if (cardNumberArr[changeNumberInArr].length ===1) cardNumberArr[changeNumberInArr] = '000' + cardNumberArr[changeNumberInArr];
    if (cardNumberArr[changeNumberInArr].length ===2) cardNumberArr[changeNumberInArr] = '00' + cardNumberArr[changeNumberInArr];
    if (cardNumberArr[changeNumberInArr].length ===3) cardNumberArr[changeNumberInArr] = '0' + cardNumberArr[changeNumberInArr];
    return cardNumberArr.join(' ');
}
async function getCard(cardNumber) {
    const connection = await db.get();
    const sql = `SELECT * FROM cards WHERE card_number = '${cardNumber}'`;
    const [[result]] = await connection.execute(sql);
    return result;
}