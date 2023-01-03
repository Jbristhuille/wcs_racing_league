/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-01-03 10:01:52
 * @ Description: Manage websocket client
 */

/* SUMMARY
    * Imports
*/

/* Imports */
import { io } from 'socket.io-client';
/***/

/* Variables */
let isConnected = false;
/***/

/*
* Name: connect
* Description: Connect client to websocket server
*
* Args:
* - user (Object): User's data
*   - id (Number): User's id
*/
const connect = (user: any) => {
    if (!isConnected) {
        isConnected = true;
        const socket = io(String(process.env.REACT_APP_WS));
    
        socket.emit("auth", user);
    }
}
/***/

export {
    connect,
    isConnected
};