/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-30 14:37:06
 * @ Description: Websocket manager
 */

/* SUMMARY
    * Imports
    * Variables
    * Name: openSocket
*/

/* Imports */
const { Server } = require('socket.io');
const { find } = require('../models/users.model');
/***/

/* Variables */
let sockets = [];
/***/

const clear = (id) => {
    let s = sockets.findIndex((el) => id == el.id);
    if (s != -1) sockets.slice(s, 1);
};

const setPort = () => {
    let i = 0;
    let port = 8000 + i;
    let isEqual = false;

    do {
        for (let p = 0; p < sockets.length; p++) {
            if (sockets[p].port != port) {
                isEqual = false;
                break;
            } else {
                port++;
            }
        }
    } while (isEqual);

    return port;
};

/*
* Name: openSocket
* Description: Open websocket for user
*
* Args:
* - id (Number): User's id
*/
const openSocket = async (id) => {
    clear(id);
    let port = setPort();
    let inst = {
        id: id,
        date: Date.now(),
        port: port,
        socket: new Server()
    };

    inst.socket.on("connection", (socket) => {
        console.log("open ", inst.id);
        socket.emit("hello", "world");
    });

    inst.socket.listen(port);
}
/***/

module.exports = {
    openSocket
};