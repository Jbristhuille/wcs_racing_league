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
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newNickname, setNewNickname] = useState<string>("");
    const [newImg, setNewImg] = useState<any>();
    const logged = useContext(LoggedContext);
    const message = useContext(MessageContext);
    const MAX_FILE_SIZE = 2; // 2Mb

    useEffect(() => {
        if (logged.user) {
            axios.get(`${process.env.REACT_APP_SERVER}/users/${logged.user.id}`, {
                headers: {
                    "x-token": logged.user ? logged.user.token : ""
                }
            }).then((res) => {
                setNewNickname(res.data.nickname);
                setProfile(res.data);
            }).catch((err) => {
                message.setMessage({txt: err.response.data, type: "error"});
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logged.user]);

    const checkFile = (e: any) => {
        if(e.target.files.length > 0){
            if (e.target.files[0].size / 1024 / 1024 > MAX_FILE_SIZE) {
                message.setMessage({txt: "L'image ne doit pas exéder 2Mb", type: "warning"});
                e.target.value = ""; // Clear file
            } else {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);

                reader.onload = () => {
                    setNewImg(reader.result);
                };

                reader.onerror = () => {
                    message.setMessage({txt: "Une erreur inconnue est survenu", type: "error"});
                    e.target.value = ""; // Clear file
                };
            }
        }
    };

    const updateProfile = () => {
        if (newNickname !== "") {
            let data: any = {...logged.user};
            data["nickname"] = newNickname;
            if (newImg) data["imgFile"] = newImg;

            axios.put(`${process.env.REACT_APP_SERVER}/users/${logged.user.id}`, data).then((res) => {
                message.setMessage({txt: "Profil mis à jour", type: "success"});
                logged.setUser(res.data);
                setIsEdit(false);
            }).catch((err) => {
                message.setMessage({txt: err.response.data, type: "error"});
            });
        } else {
            message.setMessage({txt: "Un ou plusieurs champs manquant", type: "error"});
        }
    };

    return (
        <div className="wcs-profile">
            {(profile && !isEdit) && 
                <div className="wcs-profile-info">
                    <div className="wcs-profile-avatar">
                        <img src={`${process.env.REACT_APP_SERVER}/imgs/${profile.img}`} alt="Profil avatar" />
                    </div>

                    <div>{profile.nickname}</div>
                    <div>{profile.email}</div>
                    <div>{profile.points}</div>
                </div>
            }

            {(profile && isEdit) &&
                <div className="wcs-profile-edit">
                    <div className="wcs-profile-edit-item">
                        <label htmlFor="avatar">Avatar</label>
                        <input  type="file"
                                id="avatar"
                                onChange={checkFile}
                                accept="image/png, image/jpeg, image/gif"/>
                    </div>

                    <div className="wcs-profile-edit-item">
                        <label htmlFor="nickname">Pseudo</label>
                        <input  type="text"
                                id="nickname"
                                placeholder="ex: Boys250"
                                value={newNickname}
                                className={newNickname !== "" ? "" : "invalid"}
                                onKeyDown={(e) => e.key === 'Enter' && updateProfile()}
                                onChange={(e) => setNewNickname(e.target.value)}/>
                    </div>

                    <button onClick={updateProfile}>Sauvegarder</button>
                </div>
            }

            <button onClick={() => setIsEdit(!isEdit)}>{isEdit ? "Annuler" : "Modifier"}</button>
        </div>
    );
};

export default Profile;