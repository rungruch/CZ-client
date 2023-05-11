import { NavLink} from 'react-router-dom'
//import './navbar.css'
import './account.css'
// import { useAuth } from "../utils/AuthProvider";


const Navbar = () => {
  // let auth = useAuth();
  // console.log("/account/myticket/"+auth.user?.id);
  return (
    <>
    
    <nav className='account-nav'>
      <div className="nav-container">
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/account/personalinfo">Personal Info</NavLink>
            </li>
            <li>
              <NavLink to="/account/changepassword">Change Password</NavLink>
            </li>
            <li>
              <NavLink to="/account/purchasehistory">Purchase History</NavLink>
            </li>
            <li>
              <NavLink to={"/account/myticket/"}>My Ticket</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar