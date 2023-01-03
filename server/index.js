/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-21 13:08:28
 * @ Description: Main server file
 */

/* SUMMARY
    * Imports
    * Config
    * Start websocket server
    * Start server
*/

/* Imports */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
const ws = require('./api/services/websocket.service');
/***/

/* Config */
const app = express();
app.use(cors());
app.use(express.json({limit: '2mb'}));
app.use(express.static('public'));
app.use(router);
/***/

/* Start websocket server */
ws.open();
/***/

/* Start server */
app.listen(process.env.PORT, () => {
    console.log(`Server start on port ${process.env.PORT}`);
});
/***/