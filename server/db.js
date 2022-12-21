/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-21 15:09:08
 * @ Description: Manage database connections
 */

/* SUMMARY
    * Imports
*/

/* Imports */
require('dotenv').config();
const mysql = require('mysql2/promise');
/***/

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME
});

module.exports = db;