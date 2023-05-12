import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
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

const RequireAuth = () => {
  const auth = useAuth();
  const location = useLocation();
  //console.log("*********require auth", auth.user);

  const [isLogin, setIsLogin] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  if (!auth.user?.email) {
    return (
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
    );
  }
  return <Outlet />;
};
export default RequireAuth;
