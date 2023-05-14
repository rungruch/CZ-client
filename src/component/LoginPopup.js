import "./LoginPopup.css";
import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider.js";

const LoginPopup = ({ closeModal, setIsLogin }) => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const accessToken = data?.accessToken;
        const roles = data?.data.user.roles;
        const name = data?.data.user.name;
        const id = data?.data.user._id;
        setEmail("");
        setPassword("");
        const user = { id, email, roles, accessToken, name };
        signin(user, () => navigate(from, { replace: true }));
        closeModal();
      } else {
        console.log("Login Error");
        throw new Error("Login Error");
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <div className="popup">
      <button className="close-button" onClick={closeModal}>
        X
      </button>
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="input-label">Email</label>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="input-label">Password</label>
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <p>Don't have an account ? <NavLink onClick={setIsLogin}>Signup</NavLink> </p>
    </div>
  );
};

export default LoginPopup;
