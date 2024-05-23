// src/components/Profile.js
import React from 'react';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <h1>Profile</h1>
      {currentUser ? (
        <div>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Display Name:</strong> {currentUser.displayName}</p>
        </div>
      ) : (
        <p>You need to sign in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
