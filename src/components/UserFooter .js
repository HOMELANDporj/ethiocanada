// src/components/UserFooter.js
import React from 'react';
import './UserFooter.css';
import '@fortawesome/fontawesome-free/css/all.css';

const UserFooter = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            {/* <h5 className="text-uppercase">ETHIO CANADA PORTAL</h5> */}
            {/* <p>Some footer content here. Describe your app or provide useful links.</p> */}
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start">
              <li>
                <h5 className="text-uppercase mb-0">Contact</h5>
              </li>
              <li className="d-flex align-items-center ml-md-3">
                <i className="fas fa-phone-alt mr-2"></i> +1234567890
              </li>
              <li className="d-flex align-items-center ml-md-3 mt-2 mt-md-0">
                <a href="https://t.me/abelo1666" target="_blank" rel="noopener noreferrer" className="text-dark">
                  <i className="fab fa-telegram mr-2"></i> Telegram
                </a>
              </li>
              {/* Additional contact links can go here */}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3">
        © {new Date().getFullYear()} ETHIO CANADA PORTAL. All Rights Reserved.
      </div>
    </footer>
  );
};

export default UserFooter;
