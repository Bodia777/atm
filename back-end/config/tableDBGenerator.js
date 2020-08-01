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
            CREATE TABLE IF NOT EXISTS cards (card_ID INTEGER UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                user_card_id INTEGER NOT NULL,
                card_number VARCHAR(19) NOT NULL UNIQUE,
                card_date VARCHAR(5) NOT NULL,
                belonging_to_The_Bank BOOLEAN NOT NULL,
                FOREIGN KEY (user_card_id) REFERENCES users(UserID) ON DELETE CASCADE)`;
            await connection.execute(cardsQuery);
        } catch (e) {
        throw new Error(`Couldn't create table cards`);
        }
    }
}