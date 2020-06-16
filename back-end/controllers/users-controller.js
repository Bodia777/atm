const db = require('../config/db.config');
const userMailer = require('../nodemailer/user-emailer')

module.exports = {
    getUsers: async (req, res) => {
        try {
            const connection = await db.get();
            const [rows] = await connection.execute('SELECT * FROM users');
            console.log(rows, 'rows');
            res.send('get works');
        } catch (err) {
            console.log(err, 'error<<<<<<<<<<');
            throw err;
        }
    },

    getUser: async (req, res) => {
        try {
            const user = req.body;
            console.log(user);
            const connection = await db.get();
            const [rows] = await connection.execute(`SELECT * FROM users WHERE UserLogin = '${user.userEmail}'`);
            console.log(rows, 'rows');
            res.send('get works');
        } catch (err) {
            console.log(err, 'error<<<<<<<<<<');
            throw err;
        }
    },

    getUserById: async (UserID) => {
            const connection = await db.get();
            const [rows] = await connection.execute(`SELECT * FROM users WHERE UserID = '${UserID}'`);
            return rows;
    },

    postUser: async (req, res, next) => {
        console.log('Im in post');
        try {
            const connection = await db.get();
            const user = req.body;
            const sql = `INSERT INTO users (UserLogin, UserPassword, UserConfirmEmail, isLoggedIn) VALUE ('${user.userEmail}', '${user.userPassword}', 0, 0)`;
            await connection.execute(sql);
            res.status(201).json(' ');
            userMailer(user.userEmail);
        } catch (err) {
            if (err.errno = 1062) {
                res.status(403).json({
                    message: `ERROR: ${err.sqlMessage}`
                });
            }
            console.log(err.sqlMessage, err.errno, 'error<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        }
    },
    patchUser: async (req, res) => {
        const connection = await db.get();
        const IDtoChange2 = 2;
        const valueToChange = req.body;
        const valueToChange2 = {
            UserLogin: 'Petro',
            UsePassword: 'Alladin'
        };

        const query = `UPDATE users SET ${valueToChange2.UserLogin}, ${valueToChange2.UsePassword} WHERE UserID = ${IDtoChange2};`;
        const [rows] = await connection.execute(query);
        const {
            affectedRows
        } = rows;
        console.log(rows);

        return affectedRows
    },

    deleteUser: async (req, res) => {
        const connection = await db.get();
        const IDtoDelete = 2;
        const query = `DELETE FROM users WHERE UserID = ${IDtoDelete};`;
        const [rows] = await connection.execute(query);
        const {
            affectedRows
        } = rows;
        console.log(rows);

        return affectedRows;
    },

    confirmEmail: async (req, res) => {
        try {
            const userEmail = req.query.user;
            const connection = await db.get();
            const query = `UPDATE users SET UserConfirmEmail = 1 WHERE UserLogin = '${userEmail}'`;
            await connection.execute(query);
            res.redirect('http://localhost:4200/registration?signIn=true');
        } catch (e) {
            console.log(e);
        }
    },

    confirmLogIn: async (req) => {
        const user = req.body;
        const userToConfirm = await async function () {
            try {
                const connection = await db.get();
                const [rows] = await connection.execute(`SELECT * FROM users WHERE UserLogin = '${user.userEmail}'`);
                console.log(rows);
                return rows[0];
            } catch (err) {
                return err;
            }
        }();
        if (!userToConfirm) {
            try{
                throw new Error(`ERROR: WRONG EMAIL`);
            }
            catch (e) {
                return e;
            }
        } else {
            if (userToConfirm.UserPassword !== user.userPassword) {
                try{
                    throw new Error(`ERROR: WRONG PASSWORD`);
                }
                catch (e) {
                    return (e);
                }
            } else if (userToConfirm.UserConfirmEmail !== 1) {
                try{
                    throw new Error(`ERROR: YOU HAVE TO CONFIRM YOUR EMAIL`);
                }
                catch (e) {
                    return (e);
                }
            } else {
                    const connection = await db.get();
                    const query = `UPDATE users SET isLoggedIn = 1 WHERE UserLogin = '${req.body.userEmail}'`;
                    await connection.execute(query);
                    return userToConfirm;
            }
        }
    }
}