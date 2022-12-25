/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-21 13:08:28
 * @ Description: Main server file
 */

/* SUMMARY
    * Imports
    * Config
*/

/* Imports */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
/***/

/* Config */
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(router);
/***/

/* Start server */
app.listen(process.env.PORT, () => {
    console.log(`Server start on port ${process.env.PORT}`);
});
/***/