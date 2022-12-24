/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-22 22:14:09
 * @ Description: Login page
 */

/* SUMMARY
    * Imports
    * Styles
    * Contexts
*/

/* Imports */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
/***/

/* Styles */
import './Login.scss';
/***/

/* Contexts */
import ErrorContext from "../../contexts/ErrorContext";
import LoggedContext from "../../contexts/LoggedContext";
/***/

const Login = () => {
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [passwd, setPasswd] = useState<string | undefined>(undefined);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswdValid, setIsPasswdValid] = useState<boolean>(true);
    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const logged = useContext(LoggedContext);

    useEffect(() => {
        setIsEmailValid(email !== undefined ? (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email) : true); // Check email
        setIsPasswdValid(passwd !== undefined ? (/^.+$/g).test(passwd) : true); // Check password
    }, [email, passwd]);

    const connectUser = (): void => {
        if (email && passwd && isEmailValid && isPasswdValid) { // Check email/password validity
            axios.post(`${process.env.REACT_APP_SERVER}/auth`, { // Send connection request
                email: email,
                passwd: passwd
            }).then((res) => {
                logged.setUser(res.data);
                navigate('/');
            }).catch((err) => {
                console.error(err.response.data);
                error.setMessage(err.response.data);
            });
        } else {
            console.error('Email ou mot de passe incorrect');
            error.setMessage('Email ou mot de passe incorrect');
        }
    };

    return(
        <div className="wcs-login">
            <div className="wcs-login-form">
                <div className="wcs-login-form-item">
                    <label htmlFor="email">Email:</label>
                    <input  id="email" name="email"
                            className={isEmailValid ? "" : "invalid"}
                            placeholder="ex: email@mail.fr"
                            type="text"
                            value={email || ""}
                            onKeyDown={(e) => e.key === 'Enter' && connectUser()}
                            onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="wcs-login-form-item">
                    <label htmlFor="passwd">Mot de passe:</label>
                    <input  id="passwd" name="passwd"
                            className={isPasswdValid ? "" : "invalid"}
                            placeholder="ex: mYaWes0mPaSsWd"
                            type="password"
                            value={passwd || ""}
                            onKeyDown={(e) => e.key === 'Enter' && connectUser()}
                            onChange={(e) => setPasswd(e.target.value)} />
                </div>

                <button className="wcs-login-form-button"
                        onClick={connectUser}>
                    Connexion
                </button>
            </div>
        </div>
    );
};

export default Login;