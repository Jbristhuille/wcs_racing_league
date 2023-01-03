/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-01-03 10:01:52
 * @ Description: Manage websocket client
 */

/* SUMMARY
    * Imports
*/

/* Imports */
import { useState } from 'react';
import { io } from 'socket.io-client';
/***/

const useWs = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [socket, setSocket] = useState<any>();

    const connect = (user: any) => {
        if (!isConnected) {
            setIsConnected(true);

            let s = io(String(process.env.REACT_APP_WS));
            s.emit("auth", user);

            setSocket(s);
        }
    }

    return ({
        connect,
        isConnected,
        socket
    });
};



export {
    useWs
};