import React from 'react';
import { Link } from 'react-router-dom';
import avatarPlaceholder from '../assets/icons/user.png';

const PersonalInfo = ({ user }) => {
  const { email, name, role } = user;

  return (
    <div className="PersonalInfo-container">
      <div className="PersonalInfo-image-container">
        <img src={avatarPlaceholder} alt="Avatar" />
      </div>
      <div className="PersonalInfo-details-container">
        <div className="PersonalInfo-email">{email}</div>
        <div className="PersonalInfo-name">{name}</div>
        <div className="PersonalInfo-role">{role}</div>
        <Link to="/change-password" className="PersonalInfo-change-password-link">
          Change Password
        </Link>
      </div>
    </div>
  );
};

export default PersonalInfo;
