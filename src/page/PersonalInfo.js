import React from 'react';
import PersonalInfo from '../component/PersonalInfo';

const Account = () => {
  const user = {
    email: 'johndoe@example.com',
    name: 'John Doe',
    role: 'User',
  };

  return (
    <div className="Account-container">
      <h1>My Account</h1>
      <PersonalInfo user={user} />
    </div>
  );
};

export default Account;  
