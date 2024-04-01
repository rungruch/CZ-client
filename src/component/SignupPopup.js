import "./LoginPopup.css";
import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider.js";

const SignupPopup = ({ closeModal, setIsLogin }) => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, email, password };

    try {
      const response = await fetch("https://cz-server-rungruch.azurewebsites.net/auth/signup", {
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
        const roles = data?.data.newUser.roles;
        const name = data?.data.newUser.name;
        setEmail("");
        setPassword("");
        const user = { email, roles, accessToken, name };
        signin(user, () => navigate(from, { replace: true }));
        closeModal();
      } else {
        console.log("Signup Error");
        throw new Error("Signup Error");
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
      <h2 className="login-title">Signup</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="input-label">Full Name</label>
        <input
          className="input-field"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="input-label">Email</label>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="input-label">Set Password</label>
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Signup
        </button>
      </form>
      <p>Already have an account ? <NavLink onClick={setIsLogin}>Login</NavLink>  </p>
    </div>
  );
};

export default SignupPopup;
