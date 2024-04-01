import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as Hamburger } from "../assets/icons/burger.svg";
//import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import "./navbar.css";
import { useAuth } from "../utils/AuthProvider";

import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import Modal from "react-modal";

import LoginMenu from "./LoginMenu";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const location = useLocation();

  // Modal
  const [isLogin, setIsLogin] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [email, setEmail] = useState("");
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // auth
  const auth = useAuth();
  // const navigate = useNavigate();

  return (
    <>
      <nav className={`mini-navbar`}>
        <div className="nav-container">
          <div className="time">
            <p className="todayhours">TODAY HOURS</p>
            <p className="timeopen">9AM - 10PM</p>
          </div>
          <div className="nav-elements">
            <ul>
              {/* <li>
                <NavLink to="/Programs">Programs</NavLink>
              </li>
              <li>
                <NavLink to="/Shop">Shop</NavLink>
              </li> */}
              <li>
                {/* <NavLink to="/Login">Login</NavLink> */}
                {/* <button onClick={openModal}>Login</button> */}
                {auth.user?.email ? (
                  // <button
                  //   onClick={() => {
                  //     auth.signout(() => navigate("/"));
                  //   }}
                  // >
                  //   Sign Out
                  // </button>
                  <LoginMenu/>
                ) : (
                  <button className="loginbtn" onClick={openModal}>Login</button>
                )}
              </li>
            </ul>
            <ul>
              <li className="mini-navbar-buytickets">
                <NavLink to="/Buy">Buy Tickets</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav
        className={`${location.pathname === "/" ? "mainnav navbar" : "navbar"}`}
      >
        <div className="nav-container">
          <div className="logo">
            <NavLink to="/">
              <h1>CZ AQUARIUM</h1>
            </NavLink>
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <Hamburger height={24} width={24} />
          </div>
          <div className={`nav-elements  ${showNavbar && "active"}`}>
            <ul>
              <li>
                <NavLink to="/Ticket">Ticket</NavLink>
              </li>
              <li>
                <NavLink to="/Explore">Explore</NavLink>
              </li>
              <li>
                <NavLink to="/Animal-Exhibits">Animal & Exhibits</NavLink>
              </li>
              {
                auth.user.roles=="Admin"&&
                (
                <li>
                  <NavLink to="/addticket">Manage Ticket</NavLink>
                </li>
                )
              }
              {/* <li>
                <NavLink to="/News">News</NavLink>
              </li>
              <li>
                <NavLink to="/Support">Support</NavLink>
              </li> */}
              <div className="min-element">
                <li><NavLink to="/Buy">Buy Tickets</NavLink></li>
                <li>
                <LoginMenu showNavbar={showNavbar}/>
                </li>
                
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeModal={() => setIsOpen(false)}
      >
        {isLogin ? (
          <LoginPopup
            closeModal={closeModal}
            setIsLogin={() => setIsLogin(false)}
          />
        ) : (
          <SignupPopup
            closeModal={closeModal}
            setIsLogin={() => setIsLogin(true)}
          />
        )}
      </Modal>
    </>
  );
};

export default Navbar;
