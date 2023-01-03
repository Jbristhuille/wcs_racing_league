/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-01-03 15:20:45
 * @ Description: Manage access to match table
 */

/* SUMMARY
    * Imports
    * Name: insert
*/

/* Imports */
const db = require('../../db');
/***/

/*
* Name: insert
* Description: Insert match in table
*
* Args:
* - winner (Number): Winner's id
* - loser (Number): Loser's id
*/
const insert = (winner, loser) => {
    return db.query('INSERT INTO matches (winId, loseId, date) VALUE (?, ?, ?)', [winner, loser, Date.now()]);
};
/***/

module.exports = {
    insert
};