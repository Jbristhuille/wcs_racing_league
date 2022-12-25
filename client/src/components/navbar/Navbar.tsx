/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-25 18:38:33
 * @ Description: Navbar component
 */

/* SUMMARY
    * Imports
    * Styles
*/

/* Imports */
import { NavLink } from "react-router-dom";
/***/

/* Styles */
import "./Navbar.scss";
/***/

const Navbar = () => {
    return (
        <div className="wcs-navbar">
            <NavLink to="/">Ranking</NavLink>
            <NavLink to="/profile">Profil</NavLink>
        </div>
    )
};

export default Navbar;