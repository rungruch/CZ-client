import { NavLink, redirect} from 'react-router-dom'
import { useAuth } from '../utils/AuthProvider'
import { useState } from 'react';

export default function LoginMenu({showNavbar}) {
	const auth = useAuth()
	const [showDropdown, setShowDropdown] = useState(false);
	function handleDropdownToggle() {
		setShowDropdown((prevState) => !prevState);
	  }

	  function handleNavLinkClick() {
		setShowDropdown(false);
	  }
	return (
		<>
			{auth?.user?.email ? (
				 <div className="dropdown">
				 <div
				   className="dropdown-toggle"
				   onClick={handleDropdownToggle}
				 >
				   {auth.user.email}
				   <i className="fa fa-caret-down"></i>
				 </div>
				 {showDropdown && (
				   <div className="dropdown-menu">
					
					 <NavLink to="/account" className="dropdown-item"  onClick={handleNavLinkClick}>
					   My Account
					 </NavLink>
					 {/* <div className={`acc-element  ${showNavbar && "active"}`}>
					 <NavLink to="/account/personalinfo">Personal Info</NavLink>
					 <NavLink to="/account/changepassword">Change Password</NavLink>
					 <NavLink to="/account/purchasehistory">Purchase History</NavLink>
					 </div> */}
					 <NavLink to={"/account/myticket/"} className="dropdown-item"  onClick={handleNavLinkClick}>
					   My Ticket
					 </NavLink>
					 <div
					   className="dropdown-item"
					   onClick={() => {
						 auth.signout(() => redirect('/'));
					   }}
					 >
					   Sign out
					 </div>
				   </div>
				 )}
			   </div>
			) : (

				<NavLink to="/login">Login</NavLink>

			)}{' '}
		</>
	)
}
