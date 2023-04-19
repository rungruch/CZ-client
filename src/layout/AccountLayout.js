import '../component/account.css'
import { Outlet } from "react-router-dom";
import Accountbar from '../component/AccountNav'
const Account = () => {
    return(
        <>
        <div className="Account-Container">
        <h1>My Account</h1>
        <div className="Account-line"/>
        <Accountbar/>
        </div>
        <Outlet />
        </>
    );
};
export default Account; 