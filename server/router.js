/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-21 14:50:03
 * @ Description: Router file
 */

/* SUMMARY
    * Imports
    * Controllers
    * Services
    * Users
*/

/* Imports */
const express = require('express');
const router = express.Router();
/***/

/* Controllers */
const usersController = require('./api/controllers/users.controller');
/***/

/* Services */
const usersService = require('./api/services/users.service');
/***/

/* Users */
router.post('/auth', usersService.connectionDto, usersController.login);
router.post('/users', usersService.createDto, usersService.isUserExist, usersController.signup);
router.get('/users', usersService.isLogged ,usersController.getUsersList);
router.get('/users/:id', usersService.isSelf, usersController.getUserById);
/***/

module.exports = router;