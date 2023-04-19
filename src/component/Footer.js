import { NavLink } from 'react-router-dom'
import facebook from '../assets/icons/facebook.png'
import twitter from '../assets/icons/twitter.png'
import instagram from '../assets/icons/instagram.png'
const Footer = () => {

  return (
    <>
    <footer>
      <div className="f_container">
        <div className="footer-section">
          <h4>Education</h4>
          <ul>
            <li><NavLink>Field Trips</NavLink></li>
            <li><NavLink>Student Programs</NavLink></li>
            <li><NavLink>Teacher Programs</NavLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Info</h4>
          <ul>
            <li><NavLink>About Us</NavLink></li>
            <li><NavLink>Promotions</NavLink></li>
            <li><NavLink>FAQs</NavLink></li>
            <li><NavLink>Terms and Conditions</NavLink></li>
            <li><NavLink>Privacy Policy</NavLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li><NavLink>Customer Center</NavLink></li>
            <li><NavLink>Plan an Event</NavLink></li>
            <li><NavLink>Get Support</NavLink></li>
            <li><NavLink>Contact</NavLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="contact-footer">
            <li><NavLink><img src={facebook} alt=""/></NavLink></li>
            <li><NavLink><img src={twitter} alt=""/></NavLink></li>
            <li><NavLink><img src={instagram} alt=""/></NavLink></li>
          </ul>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;