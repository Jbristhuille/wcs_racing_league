/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-12-25 18:32:09
 * @ Description: User profile page
 */

/* SUMMARY
    * Imports
    * Contexts
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
import "./Profile.scss";
/***/

const Profile = () => {
    const [profile, setProfile] = useState<any | null>(null);
    const logged = useContext(LoggedContext);
    const message = useContext(MessageContext);

    useEffect(() => {
        if (logged.user) {
            axios.get(`${process.env.REACT_APP_SERVER}/users/${logged.user.id}`, {
                headers: {
                    "x-token": logged.user ? logged.user.token : ""
                }
            }).then((res) => {
                setProfile(res.data);
            }).catch((err) => {
                message.setMessage({txt: err.response.data, type: "error"});
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logged.user]);

    return (
        <div className="wcs-profile">
            {profile && 
                <>
                    <div className="wcs-profile-avatar">
                    <img src={`${process.env.REACT_APP_SERVER}/imgs/${profile.img}`} alt="Profil avatar" />
                    </div>

                    <div>{profile.nickname}</div>
                    <div>{profile.email}</div>
                    <div>{profile.points}</div>
                </>
            }
        </div>
    );
};

export default Profile;