/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-01-04 15:22:19
 * @ Description: Confirm match modal
 */

/* SUMMARY
    * Imports
    * Contexts
    * Styles
    * Interfaces
*/

/* Imports */
import axios from "axios";
import { useContext } from "react";
/***/

/* Contexts */
import LoggedContext from "../../contexts/LoggedContext";
import MessageContext from "../../contexts/MessageContext";
/***/

/* Styles */
import "./ConfirmMatch.scss";
/***/

/* Interfaces */
interface Player {
    id: number,
    nickname: String,
    point: number
};

interface MatchResults {
    close: Function,
    winner: Player,
    loser: Player,
    id: number
};
/***/

const ConfirmMatch = (props: MatchResults) => {
    const logged = useContext(LoggedContext);
    const message = useContext(MessageContext);

    const sendResult = (state: boolean) => {
        axios.put(`${process.env.REACT_APP_SERVER}/match/${props.id}`, {
            result: state
        }, {
            headers: {
                "x-token": logged.user ? logged.user.token : ""
            }
        }).then(() => {
            message.setMessage({txt: `Message ${state ? 'confirmé' : 'contesté'}`, type: "success"});
            props.close();
        }).catch((err) => {
            message.setMessage({txt: err.response.data, type: "error"});
        });
    } 

    return (
        <div className="wcs-confirm-match">
            <h3>Vainqueur;</h3>
            <div>{props.winner.nickname}</div>

            <h3>Perdant:</h3>
            <div>{props.loser.nickname}</div>

            <button onClick={() => sendResult(true)}>
                Confirmer
            </button>

            <button onClick={() => sendResult(true)}>
                Annuler
            </button>
        </div>
    );
};

export default ConfirmMatch;