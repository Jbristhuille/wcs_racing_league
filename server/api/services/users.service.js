/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-21 15:26:19
 * @ Description: Users endpoint middleware and services
 */

/* SUMMARY
    * Imports
    * Name: createDto
    * Name: connectionDto
    * Name: isUserExist
    * Name: isLogged
    * Name: isSelf
    * Name: editProfileDto
*/

/* Imports */
const usersModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
/***/

/*
* Name: createDto
* Description: Vertify body data on user creation
*/
const createDto = (req, res, next) =>{
    try {
        let {email, passwd, nickname} = req.body;

        if (email && passwd && nickname) return next();
        else return res.status(400).send('Requête invalide');
    } catch(err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
};
/***/

/*
* Name: connectionDto
* Description: Check login request body
*/
const connectionDto = (req, res, next) => {
    try {
        let {email, passwd} = req.body;
        
        if (email && passwd) return next();
        else return res.status(400).send('Requête invalide');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
}
/***/

/*
* Name: isUserExist
* Description: Check if user already exist
*/
const isUserExist = async (req, res, next) => {
    try {
        let {email} = req.body;
        let [[user]] = await usersModel.findByEmail(email);

        if (user) return res.status(403).send("L'utilisateur existe déjà");
        else return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
}
/***/

/*
* Name: isLogged
* Description: Check if user has token and it is valid
*/
const isLogged = (req, res, next) => {
    try {
        let token = req.headers['x-token'];
        
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
                if (err) return res.status(403).send("Token invalide");
                else return next();
            });
        } else {
            return res.status(401).send("Identification nécéssaire");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
};
/***/

/*
* Name: isSelf
* Description: Check if current user gettig self profile
*/
const isSelf = (req, res, next) => {
    try {
        const token = req.headers["x-token"];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send("Token invalide");
            else if (user.id == req.params.id) return next();
            else return res.status(403).send("Non autorisé");
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
};
/***/

/*
* Name: editProfileDto
* Description: Check update profile payload content
*/
const editProfileDto = (req, res, next) => {
    try {
        if (req.body.nickname && req.body.img) return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
}
/***/

module.exports = {
    createDto,
    connectionDto,
    isUserExist,
    isLogged,
    isSelf,
    editProfileDto
};