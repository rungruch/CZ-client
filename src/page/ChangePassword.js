import { useState } from 'react';
import changePasswordFunc from '../component/ChangePasswordFunc';

function ChangePassword() {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await changePasswordFunc(email, oldPassword, newPassword);
            console.log(response);
            // handle success
        } catch (error) {
            console.error(error);
            // handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required />
            <label htmlFor="oldPassword">Old Password</label>
            <input
                id="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                required />
            <label htmlFor="newPassword">New Password</label>
            <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required />
            <button type="submit">Change Password</button>
        </form>
    );
}


export default ChangePassword;  