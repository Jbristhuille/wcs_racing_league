/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-21 15:01:17
 * @ Description: Users endpoint database model
 */

/* SUMMARY
    * Imports
    * Name: find
    * Name: findById
    * Name: create
    * Name: findByEmail
*/

/* Imports */
const db = require('../../db');
/***/

/*
* Name: find
* Description: Get all users with public info
*
* Return (Array): Users list
*/
const find = () => {
    return db.query('SELECT id, email, nickname, img, points FROM users ORDER BY points DESC');
}
/***/

/*
* Name: findById
* Description: Get user by ID
*
* Args:
* - id (Number): User's ID
*
* Return (Object): User's data
*/
const findById = (id) => {
    return db.query('SELECT * FROM users WHERE id=?', [
        id
    ]);
};
/***/

/*
* Name: findByEmail
* Description: Get user by email
*
* Args:
* - email (String): User's email
*
* Return (Object): User's data
*/
const findByEmail = (email) => {
    return db.query('SELECT * FROM users WHERE email=?', [
        email
    ]);
};
/***/

/*
* Name: create
* Description: Create new user
*
* Args:
* - email (String): New user's email
* - passwd (String): New user's password
* - nickname (String): New user's nickname
*/
const create = (email, passwd, nickname) => {
    return db.query('INSERT INTO users (email, passwd, nickname) VALUE (?, ?, ?)', [
        email,
        passwd,
        nickname
    ]);
};
/***/

module.exports = {
    find,
    findById,
    findByEmail,
    create
};