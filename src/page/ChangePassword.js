import { useEffect, useState } from 'react';
import '../component/account.css'
import { useAuth } from "../utils/AuthProvider";
import { Form, redirect } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Account = () => {

    const [userdata, setuserdata] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    let auth = useAuth();
    useEffect(() => {
        const fetchData = async () => {
          const user = await Userloader(auth.user.email);
          
          setuserdata(user);
        };
        fetchData();
      }, [auth.user.email]);

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const match = await bcrypt.compare(formData.get("oldpassword"), userdata.password); 
        if(!match){
            setModalMessage('Old password is incorrect');
            setShowModal(true);
            return;
        } 

        if(formData.get("newpassword") !== formData.get("confirmnewpassword")){
            setModalMessage('New password does not match');
            setShowModal(true);
            return;
        }
        const email = auth.user.email;
        const data = {
            password: formData.get("newpassword")
        };
        const res = await fetch(`https://cz-server-rungruch.azurewebsites.net/api/user/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            setModalMessage('User data updated successfully!');
            setShowModal(true);
            auth.signout(() => redirect('/'));
        } else {
            setModalMessage('Error updating user data');
            setShowModal(true);
        }
    };
    
    const closeModal = () => {
        setShowModal(false);
    };
    
    return(
        <>
		<>
		{true ? (
		<Form replace method="post" className="user-form" onSubmit={handleSubmit}>
			<label>
				<input placeholder="Old Password" type="password" name="oldpassword"  required />
			</label>
            <span>New Password</span>
			<label>
				<input placeholder="New Password" type="password" name="newpassword"  required />
			</label>
            <label>
				<input placeholder="Confirm New Password" type="password" name="confirmnewpassword"  required />
			</label>
			<p>
				<button type="submit">Change Password </button>
			</p>
		</Form>
		) : (
			<div>No such product!</div>
		  )}
		</>
  
        {showModal && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p>{modalMessage}</p>
                </div>
            </div>
        )}
        </>
    );
};

export default Account; 

export const Userloader = async (email) => {
    const res = await fetch('https://cz-server-rungruch.azurewebsites.net/api/user/' + email)
    let user = await res.json()
    if (!res.ok) {
        throw Error(user.error)
    }
    return user //res.json()
    
}
