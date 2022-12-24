/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-24 15:19:24
 * @ Description: Manage pages access when user is connected
 */

/* SUMMARY
    * Imports
    * Interfaces
*/

/* Imports */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/***/

/* Contexts */
import LoggedContext from "../../contexts/LoggedContext";
/***/

/* Interface */
interface LoggedUserGuardProps {
    children?: any
};
/***/

const LoggedUserGuard = (props: LoggedUserGuardProps) => {
    const logged = useContext(LoggedContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!logged.user) navigate('/login');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {props.children}
        </>
    );
};

export default LoggedUserGuard;