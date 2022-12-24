/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-21 15:01:12
 * @ Description: Users endpoint controller
 */

/* SUMMARY
    * Imports
    * Name: getUsersList
    * Name: signup
    * Name: login
*/

/* Imports */
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users.model');
/***/

/*
* Name: getUsersList
* Description: Get public users list
*
* Return (Array): Public users list
*/
const getUsersList = async (req, res) => {
    try {
        let [users] = await usersModel.find();
        return res.status(200).send(users);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
}
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
        return res.status(500).send('Une erreur inconnue est survenu');
    }
};
/***/

/*
* Name: login
* Description: Connect user
*
* Body:
* - email (String): User email
* - passwd (String): User password
*
* Return (Object): User data with token
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
                return res.status(403).send('Identifiants invalide');
            }
        } else {
            return res.status(404).send("L'utilisateur n'a pas pu être trouvé");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
};
/***/

module.exports = {
    getUsersList,
    signup,
    login
};