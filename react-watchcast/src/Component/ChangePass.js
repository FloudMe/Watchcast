import axios from "axios";
import { React, useState } from 'react';
import authentication from '../scripts/authentication';

const ChangePass = () => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [checkNewPass, setCheckNewPass] = useState('');

    const checkPassword = (e) => {
        e.preventDefault();

        if (newPass === checkNewPass) {
            axios.put(global.config.backendPath + `users/changePass`,
                { "newPassword": newPass, "oldPassword": oldPass },
                { headers: { 'authorization': authentication.authenticationHeader() } })
                .catch(err => {
                    alert(err.response.data.message)
                })
        }
    }

    return (
        <form className="formChangePass" onSubmit={checkPassword}>
            Old password: <input
                className='changePassFormInput'
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="Old password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)} />
            New password: <input
                className='changePassFormInput'
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)} />
            Repeat new password:<input
                style={newPass !== checkNewPass ? { borderBottomColor: "red" } : {}}
                className='changePassFormInput'
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
