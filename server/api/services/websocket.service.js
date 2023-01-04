/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-30 14:37:06
 * @ Description: Websocket manager
 */

/* SUMMARY
    * Imports
    * Variables
    * Name: findSocket
    * Name: removeSocket
    * Name: open
*/

/* Imports */
const { Server } = require('socket.io');
/***/

/* Variables */
let sockets = [];
/***/

/*
* Name: findSocket
* Description: Find socket by ID
*
* Args:
* - id (String): User's id
*
* Return (Object): Socket's data or null
*/
const findSocket = (id) => {
    return sockets.find((el) => el.id === id);
}
/***/

/*
* Name: removeSocket
* Description: Remove old socket in array
*
* Args:
* - socketId (String): Socket id
*/
const removeSocket = (socketId) => {
    let i = sockets.findIndex((el) => el.socket.id === socketId);
    if (i != -1) sockets.splice(i, 1);
};
/***/

/*
* Name: open
* Description: Start websocket server
*/
const open = () => {
    let ws = new Server({
        cors: {}
    });

    ws.on("connection", (socket) => {
        socket.on("auth", (data) => {
            let s = findSocket(data.id);
            if (s) removeSocket(s.socket.id);
            
            sockets.push({
                id: data.id,
                date: Date.now(),
                socket: socket
            });

            console.log(`WS client connected: ${socket.id}`);
        });

        socket.on("disconnect", () => {
            removeSocket(socket.id);
            console.log(`WS client disconnected: ${socket.id}`);
        });
    });

    ws.listen(process.env.WS_PORT);
}
/***/

module.exports = {
    open,
    findSocket
};