/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-24 14:06:41
 * @ Description: Error popup component, print error
 */

/* SUMMARY
    * Imports
    * Contexts
*/

/* Imports */
import { useContext, useEffect, useRef } from "react";
/***/

/* Contexts */
import ErrorContext from "../contexts/ErrorContext";
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
                <div className="wcs-error-popup">
                    {error.message}
                </div>
            }
        </>
    )
};

export default ErrorPopup;