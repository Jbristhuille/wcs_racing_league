/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-01-03 14:28:39
 * @ Description: Print match details modal
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
import MessageContext from "../../contexts/MessageContext";
import LoggedContext from "../../contexts/LoggedContext";
/***/

/* Styles */
import "./MatchDetails.scss";
/***/

/* Interfaces */
interface Player {
    id: number,
    nickname: String,
    points: number
};

interface Match {
    player1: Player,
    player2: Player,
    close: Function
};
/***/

const MatchDetails = (props: Match) => {
    const message = useContext(MessageContext);
    const logged = useContext(LoggedContext);

    const sendResult = (winner: Player, loser: Player) => {
        axios.post(`${process.env.REACT_APP_SERVER}/match`, {
                winner,
                loser,
                target: props.player2.id
            }, {
                headers: {
                    "x-token": logged.user ? logged.user.token : ""
                }
        }).then(() => {
            props.close();
        }).catch((err) => {
            message.setMessage({txt: err.response.data, type: "error"});
        });
    };

    return (
        <div className="wcs-match-details">
            <div className="wcs-match-player">
                <h3>Joueur 1</h3>
                <div>{props.player1.nickname}</div>
            </div>

            <div className="wcs-match-player">
                <h3>Joueur 2</h3>
                <div>{props.player2.nickname}</div>
            </div>

            <h3>Vainqueur:</h3>

            <button className="wcs-match-result"
                    onClick={() => sendResult(props.player1, props.player2)}>
                {props.player1.nickname}
            </button>

            <button className="wcs-match-result"
                    onClick={() => sendResult(props.player2, props.player1)}>
                {props.player2.nickname}
            </button>

            <div className="wcs-match-cancel" onClick={() => props.close()}>Annuler</div>
        </div>
    )
};

export default MatchDetails;