/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-24 15:31:55
 * @ Description: User registration page
 */

/* SUMMARY
    * Imports
    * Styles
    * Contexts
*/

/* Imports */
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
/***/

/* Styles */
import "./Signup.scss";
/***/

/* Contexts */
import MessageContext from '../../contexts/MessageContext';
/***/

const Signup = () => {
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [nickname, setNickname] = useState<string | undefined>(undefined);
    const [passwd, setPasswd] = useState<string | undefined>(undefined);
    const [confirmPasswd, setConfirmPasswd] = useState<string | undefined>(undefined);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswdValid, setIsPasswdValid] = useState<boolean>(true);
    const [isConfirmPasswdValid, setIsConfirmPasswdValid] = useState<boolean>(true);
    const msg = useContext(MessageContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsEmailValid(email !== undefined ? (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email) : true); // Check email
        setIsPasswdValid(passwd !== undefined ? (/^.+$/g).test(passwd) : true); // Check password
        setIsConfirmPasswdValid(confirmPasswd !== undefined ? passwd === confirmPasswd : true);
    }, [email, passwd, confirmPasswd]);

    const signupUser = () => {
        if (email && nickname && passwd && isEmailValid && isPasswdValid && isConfirmPasswdValid) {
            axios.post(`${process.env.REACT_APP_SERVER}/users`, {
                email: email,
                passwd: passwd,
                nickname: nickname
            }).then((res: any) => {
                msg.setMessage({txt: "Inscription réussi", type: "success"});
                navigate('/login');
            }).catch((err: any) => {
                console.error(err.response.data);
                msg.setMessage({txt: err.response.data, type: "error"});
            });
        } else {
            console.error('Un ou plusieurs champs sont invalide');
            msg.setMessage({txt: 'Un ou plusieurs champs sont invalide', type: "error"});
        }
    };

    return (
        <div className="wcs-signup">
            <div className="wcs-signup-form">
                <div className="wcs-signup-form-item">
                    <label htmlFor="email">Email:</label>
                    <input  id="email"
                            type="text"
                            placeholder="ex: demo@mail.fr"
                            className={isEmailValid ? "" : "invalid"}
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="wcs-signup-form-item">
                    <label htmlFor="nickname">Pseudo:</label>
                    <input  id="nickname"
                            type="text"
                            placeholder="ex: AnwsomeMe"
                            value={nickname || ""}
                            onKeyDown={(e) => e.key === 'Enter' && signupUser()}
                            onChange={(e) => setNickname(e.target.value)} />
                </div>

                <div className="wcs-signup-form-item">
                    <label htmlFor="password">Mot de passe:</label>
                    <input  id="password"
                            type="password"
                            placeholder="ex: mYAnsw0mEPass"
                            className={isPasswdValid ? "" : "invalid"}
                            value={passwd || ""}
                            onKeyDown={(e) => e.key === 'Enter' && signupUser()}
                            onChange={(e) => setPasswd(e.target.value)} />
                </div>

                <div className="wcs-signup-form-item">
                    <label htmlFor="confirm-password">Confirmation mot de passe:</label>
                    <input  id="confirm-password"
                            type="password"
                            placeholder="ex: mYAnsw0mEPass"
                            className={isConfirmPasswdValid ? "" : "invalid"}
                            value={confirmPasswd || ""}
                            onKeyDown={(e) => e.key === 'Enter' && signupUser()}
                            onChange={(e) => setConfirmPasswd(e.target.value)} />
                </div>

                <button className="wcs-signup-form-button"
                        onClick={signupUser}>
                    Inscription
                </button>
            </div>
        </div>
    )
};

export default Signup;