import React from 'react';
import { useAuth } from '../AuthContext';
import './ProfilePage.css'; // Import the CSS file for styling

const ProfilePage = () => {
  const { currentUser, userDetails } = useAuth();

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Details</h2>
      {currentUser && userDetails ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {currentUser.displayName || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {userDetails.phoneNumber || 'N/A'}</p>
          <div className="profile-images">
            <div>
              <p><strong>Profile Picture:</strong></p>
              <img src={userDetails.pictureURL} alt="Profile" className="profile-image" />
            </div>
            <div>
              <p><strong>Passport Image:</strong></p>
              <img src={userDetails.passportURL} alt="Passport" className="profile-image" />
            </div>
            <div>
              <p><strong>ID Picture:</strong></p>
              <img src={userDetails.idPicURL} alt="ID" className="profile-image" />
            </div>
          </div>
          <p><strong>UID:</strong> {currentUser.uid}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
