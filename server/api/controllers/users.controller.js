/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-21 15:01:12
 * @ Description: Users endpoint controller
 */

/* SUMMARY
    * Imports
    * Name: signup
    * Name: login
*/

/* Imports */
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');
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

        delete user.passwd;
        return res.status(201).send(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};
/***/

/*
*/
const login = async (req, res) => {
    try {
        let {email, passwd} = req.body;
        let [[user]] = await usersModel.findByEmail(email);

        if (user) {
            if (user.passwd == sha256(passwd)) {
                delete user.passwd;
                user['token'] = jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_TIMEOUT});
                return res.status(200).send(user);
            } else {
                return res.status(403).send('Invalid Credentials');
            }
        } else {
            return res.status(404).send('User Not Found');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};
/***/

module.exports = {
    signup,
    login
};