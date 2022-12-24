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
import ErrorContext from "../../contexts/ErrorContext";
/***/

/* Styles */
import "./MessagePopup.scss";
/***/

const ErrorPopup = () => {
    const error = useContext(ErrorContext);
    const time: number = 5000; // 5 seconds
    const timeout = useRef<any>();

    useEffect(() => {
        if (error.message) { // Clear error message
            if (timeout.current) clearTimeout(timeout.current); // Reset message time

            timeout.current = setTimeout(() => {
                error.setMessage(undefined);
            }, time);
        }
    }, [error]);

    return (
        <>
            {error.message && 
                <div className="wcs-message-popup">
                    {error.message}
                </div>
            }
        </>
    )
};

export default ErrorPopup;