const db = require('./db.config');

module.exports = {
    createTable: function () {
        setTimeout(async () =>{
            try {
            const connectionForTable = await db.get();
            const query = `
            CREATE TABLE IF NOT EXISTS users (UserID INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                UserLogin VARCHAR(30) NOT NULL UNIQUE, UserPassword VARCHAR(20) NOT NULL, UserConfirmPassword BOOL NOT NULL)`;
                    await connectionForTable.execute(query);
                // if (table[0].warningStatus === 0) {
                //     // await db.populate(connection, data);
                //     console.log(`Table users created <=========`);
                // }
            } catch (e) {
                throw new Error(`Couldn't create table users`);
            }
        })
        
    }
}