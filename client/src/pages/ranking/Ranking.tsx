/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-25 12:01:39
 * @ Description: User ranking page
 */

/* SUMMARY
    * Imports
    * Styles
*/

/* Imports */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
/***/

/* Contexts */
import MessageContext from "../../contexts/MessageContext";
import LoggedContext from "../../contexts/LoggedContext";
/***/

/* Styles */
import "./Ranking.scss";
import { useWs } from '../../services/Websocket';
import MatchDetails from "../../components/match-details/MatchDetails";
/***/

const Ranking = () => {
    const [rankList, setRankList] = useState<any[]>([]);
    const [matchDetails, setMatchDetails] = useState<any>(null);
    const message = useContext(MessageContext);
    const logged = useContext(LoggedContext);
    const ws = useWs();

    
    useEffect(() => {
        if (logged.user) ws.connect(logged.user);

        axios.get(`${process.env.REACT_APP_SERVER}/users`, {
            headers: {
                "x-token": logged.user ? logged.user.token : ""
            }
        }).then((res) => {
            setRankList(res.data);
        }).catch((err) => {
            message.setMessage({txt: err.response.data, type: "error"});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (ws.socket) {
            ws.socket.on("confirm", (data: any) => {
                console.log(data);
            });
        }
    }, [ws.socket]);

    return (
        <div className="wcs-ranking">
            {rankList.map((el) => (
                <div    key={el.id}
                        className={`wcs-rank-item ${logged.user.id !== el.id && 'available'}`}
                        onClick={() => {
                            logged.user.id !== el.id && setMatchDetails({
                                player1: logged.user,
                                player2: el,
                                close: () => setMatchDetails(null)
                            })
                        }}>
                    <div className="wcs-rank-item-avatar">
                        <img src={`${process.env.REACT_APP_SERVER}/imgs/${el.img}`} alt="Profil avatar" />
                    </div>

                    <div>{el.nickname}</div>
                    <div>{el.points}</div>
                </div>
            ))}

            {matchDetails && <MatchDetails {...matchDetails}/>}
        </div>
    )
};

export default Ranking;