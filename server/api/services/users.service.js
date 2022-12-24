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
*/

/* Imports */
const usersModel = require('../models/users.model');
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
        else return res.status(400).send('Bad Request');
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

module.exports = {
    createDto,
    connectionDto,
    isUserExist
};