/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-21 15:01:12
 * @ Description: Users endpoint controller
 */

/* SUMMARY
    * Imports
    * Name: signup
*/

/* Imports */
const sha256 = require('js-sha256');
const usersModel = require('../models/userS.model');
/***/

/*
* Name: signup
* Description: Register new user
*
* Body:
* - email (String): User's email
* - passwd (String): User's password
*
* Return (Object): New user's data
*/
const signup = async (req, res) => {
    try {
        let {email, passwd, nickname} = req.body;
        let [result] = await usersModel.create(email, sha256(passwd), nickname);
        let [[user]] = await usersModel.findById(result.insertId);

        return res.status(201).send(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};
/***/

module.exports = {
    signup
};