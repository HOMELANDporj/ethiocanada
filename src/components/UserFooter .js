// src/components/UserFooter.js
import React from 'react';
import './UserFooter.css';

const UserFooter = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">ETHIO CANADA PORTAL</h5>
            {/* <p>Some footer content here. Describe your app or provide useful links.</p> */}
          </div>
        
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} ETHIO CANADA PORTAL. All Rights Reserved.
      </div>
    </footer>
  );
};

export default UserFooter;
