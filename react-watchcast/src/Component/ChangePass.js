import { React, useState } from 'react';
import axios from "axios";

const ChangePass = () => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [checkNewPass, setCheckNewPass] = useState('');

    const checkPassword = (e) => {
        e.preventDefault();

        if (newPass === checkNewPass) {
            axios.put(`http://localhost:4000/users/changePass` /*+ uuid*/, { "password": newPass })
                .then(res => {
                    if (res.status) {
                        alert("Pomyslnie zmieniono haslo");

                        setOldPass('');
                        setNewPass('');
                        setCheckNewPass('');
                    }
                    else
                        alert("Nie zmienono hasła");
                })
        }
    }

    return (
        <form onSubmit={checkPassword}>
            <input className="oldPassword" type="password" name="oldPassword" id="oldPassword" placeholder="Old password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
            <input className="newPassword" type="password" name="newPassword" id="newPassword" placeholder="New password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
            <input className="repeatNewPassword"
                type="password"
                name="repeatNewPassword"
                id="repeatNewPassword"
                placeholder="Repeat new password"
                value={checkNewPass}
                onChange={(e) => setCheckNewPass(e.target.value)} />
            <input className="newPasswordSubmit" type="submit" value="Change Password" />
        </form>
    )
}



export default ChangePass
