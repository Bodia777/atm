const mysql = require('mysql2/promise');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root', 
//     password: 'LV123!',
//     database: 'atm',
// });

const dbConf = {
    host: 'localhost',
    user: 'root',
    password: 'LV123!',
    database: 'atm',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
  const state = { pool: null };

const createDB = async function (connection, database) {
    const query = `CREATE DATABASE IF NOT EXISTS ${database};`;
    // USE ${database}`;
    try {
        await connection.execute(query);
        console.log(`Created DB ${database}`)
    } catch (e) {
        throw new Error(e, `couldn't create db.`);
    }
};

const updateConnection = async function(connection, options) {
    await connection.getConnection().then(conf => {
        console.log('================Database===================');
        console.log(' name : ' + conf.config.database);
        console.log(' host : ' + conf.config.host);
        console.log(' port : ' + conf.config.port);
        console.log('===========================================');
    })

  
};

const connect = async function (numberofTrials = 3) {
    if (numberofTrials === 0)
        throw new Error('Missing database connection.');
    try {
        state.pool = await mysql.createPool(dbConf);

        await createDB(state.pool, dbConf.database);
        await updateConnection(state.pool, dbConf.database);
    } catch (e) {
        await connect(numberofTrials - 1);
    }
};

const get = function () {
    const pool = state.pool;
    if (!pool) throw new Error('Missing database connection.');
    return pool;
};

module.exports = { get, connect };
