const express = require('express');
const db = require('../config/db.config');

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
            const user2 = {
                userLogin: 'asdg',
                userPassword: 'wert'
            };
            const connection = await db.get();
            const [rows] = await connection.execute(`SELECT * FROM users WHERE UserLogin = '${user2.userLogin}'`);
            console.log(rows, 'rows');
            res.send('get works');
        } catch (err) {
            console.log(err, 'error<<<<<<<<<<');
            throw err;
        }
    },

 postUser: async (req, res) => {
        console.log('Im in post');

        try {
            const connection = await db.get();
            const user2 = req.body;
            console.log(user2);
            const user = {
                userLogin: 'asdg',
                userPassword: 'wert'
            }
            const sql = `INSERT INTO users (UserLogin, UserPassword) VALUE ('${user.userLogin}', '${user.userPassword}')`;
            await connection.execute(sql);
            res.send('post works');
        } catch (err) {
            console.log(err, 'error<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        }
    },
    patchUser: async (req, res) => {
        const connection = await db.get();
        const IDtoChange2 = 2;
        const valueToChange = req.body;
        const valueToChange2 = {UserLogin: 'Petro', UsePassword: 'Alladin'};

        const query = `UPDATE users SET ${valueToChange2.UserLogin}, ${valueToChange2.UsePassword} WHERE UserID = ${IDtoChange2};`;
        const [rows] = await connection.execute(query);
        const {affectedRows} = rows;
        console.log(rows);
        
        return affectedRows
    },

    deleteUser: async (req, res) => {
        const connection = await db.get();
        const IDtoDelete = 2;
        const query = `DELETE FROM users WHERE UserID = ${IDtoDelete};`;
        const [rows] = await connection.execute(query);
        const {affectedRows} = rows;
        console.log(rows);
        
        return affectedRows;
    }
}