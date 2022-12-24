/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-24 14:17:35
 * @ Description: Message context
 */

/* SUMMARY
    * Imports
    * Interfaces
*/

/* Imports */
import { createContext, useState } from "react";
/***/

/* Interfaces */
interface MessageContextProps {
    children?: any
};
/***/

const MessageContext = createContext<any>(undefined);

export const MessageContextProvider = (props: MessageContextProps) => {
    const [message, setMessage] = useState<any | undefined>(undefined);

    return (
        <MessageContext.Provider value={{message, setMessage}}>
            {props.children}
        </MessageContext.Provider>
    );
}

export default MessageContext;