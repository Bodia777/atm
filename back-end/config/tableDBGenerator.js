const db = require('../config/db.config');

module.exports = {
    createUsersTable: async function () {
        const { connection } = this;
        try {
            const userQuery = `
            CREATE TABLE IF NOT EXISTS users (UserID INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                UserLogin VARCHAR(30) NOT NULL UNIQUE, 
                UserPassword VARCHAR(20) NOT NULL, 
                UserConfirmEmail BOOL NOT NULL, isLoggedIn BOOL NOT NULL)`;
            await connection.execute(userQuery);
        } catch (e) {
            throw new Error(`Couldn't create table users`);
        }
    },
    createCardsTable: async function () {
        const { connection } = this;
        try {
            const cardsQuery = `
            CREATE TABLE IF NOT EXISTS cards (CardID INTEGER UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                USER_CARD_ID INTEGER NOT NULL,
                CardNumber VARCHAR(19) NOT NULL UNIQUE,
                CardDate VARCHAR(5) NOT NULL,
                FOREIGN KEY (USER_CARD_ID) REFERENCES users(UserID) ON DELETE CASCADE)`;
            await connection.execute(cardsQuery);
        } catch (e) {
        throw new Error(`Couldn't create table cards`);
        }
    }
}