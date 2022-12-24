/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-24 15:05:18
 * @ Description: Manage logged user
 */


/* SUMMARY
    * Imports
    * Interfaces
*/

/* Imports */
import { createContext, useState } from "react";
/***/

/* Interfaces */
interface LoggedContextProps {
    children?: any
};
/***/

const LoggedContext = createContext<any>(null);

export const LoggedContextProvider = (props: LoggedContextProps) => {
    const [user, setUser] = useState<any | undefined>(undefined);

    return (
        <LoggedContext.Provider value={{user, setUser}}>
            {props.children}
        </LoggedContext.Provider>
    )
};

export default LoggedContext;