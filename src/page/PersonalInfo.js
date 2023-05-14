import { useEffect, useState } from 'react';
import '../component/account.css'
import { useAuth } from "../utils/AuthProvider";
import { Form} from 'react-router-dom';

const Account = () => {
    const [userdata, setuserdata] = useState([]);
    let auth = useAuth();
    useEffect(() => {
        const fetchData = async () => {
          const user = await Userloader(auth.user.email);
          
          setuserdata(user);
        };
        fetchData();
      },  [auth.user.email]);


      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = auth.user.email;
        const data = {
            name: formData.get("name"),
            email: formData.get("email")
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
        } else {
            alert('Error updating user data');
        }
    };
    
    
    return(
        <>
		<>
		{userdata ? (
		<Form replace method="post" className="user-form" onSubmit={handleSubmit}>
			<label>
				<span>name</span>
				<input placeholder="name" type="text" name="name" defaultValue={userdata.name} required />
			</label>
			<label>
				<span>email</span>
				<input placeholder="email" type="text" name="email" defaultValue={userdata.email} required />
			</label>
			<p>
				<button type="submit">Save </button>
			</p>
		</Form>
		) : (
			<div>user data error</div>
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