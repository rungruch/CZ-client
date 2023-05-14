import { useEffect, useState } from 'react';
import '../component/account.css'
import { useAuth } from "../utils/AuthProvider";
import { Form, redirect } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Account = () => {

    const [userdata, setuserdata] = useState([]);
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
            alert('Old password is incorrect');
            return;
        } 

        if(formData.get("newpassword") !== formData.get("confirmnewpassword")){
            alert('New password does not match');
            return;
        }
        const email = auth.user.email;
        const data = {
            password: formData.get("newpassword")
        };
        const res = await fetch(`/api/user/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            alert('User data updated successfully!');
            auth.signout(() => redirect('/'));
        } else {
            alert('Error updating user data');
        }
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
  
        </>
    );
};
export default Account; 

export const Userloader = async (email) => {
	const res = await fetch('/api/user/' + email)
	let user = await res.json()
	if (!res.ok) {
		throw Error(user.error)
	}
	return user //res.json()
	
}
