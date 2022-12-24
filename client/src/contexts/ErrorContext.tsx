/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-24 14:17:35
 * @ Description: Error context
 */

/* SUMMARY
    * Imports
    * Interfaces
*/

/* Imports */
import { createContext, useState } from "react";
/***/

/* Interfaces */
interface ErrorContextProps {
    children?: any
};
/***/

const ErrorContext = createContext<any>(undefined);

export const ErrorContextProvider = (props: ErrorContextProps) => {
    const [message, setMessage] = useState<string | undefined>(undefined);

    return (
        <ErrorContext.Provider value={{message, setMessage}}>
            {props.children}
        </ErrorContext.Provider>
    );
}

export default ErrorContext;