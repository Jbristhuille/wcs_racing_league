/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-24 14:06:41
 * @ Description: Message popup component, print error
 */

/* SUMMARY
    * Imports
    * Contexts
    * Styles
*/

/* Imports */
import { useContext, useEffect, useRef } from "react";
/***/

/* Contexts */
import MessageContext from "../../contexts/MessageContext";
/***/

/* Styles */
import "./MessagePopup.scss";
/***/

const ErrorPopup = () => {
    const msg = useContext(MessageContext);
    const time: number = 5000; // 5 seconds
    const timeout = useRef<any>();

    useEffect(() => {
        console.log(msg.message);

        if (msg.message) { // Clear error message
            if (timeout.current) clearTimeout(timeout.current); // Reset message time

            timeout.current = setTimeout(() => {
                msg.setMessage(undefined);
            }, time);
        }
    }, [msg]);

    return (
        <>
            {msg.message && 
                <div className={`wcs-message-popup ${msg.message.type}`}>
                    {msg.message.txt}
                </div>
            }
        </>
    )
};

export default ErrorPopup;