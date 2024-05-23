// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ReceiptUpload from './components/ReceiptUpload';
import AdminPage from './components/AdminPage';
import MainPage from './components/MainPage'; // Import MainPage
import WaitingForApproval from './components/WaitingForApproval'; // Import WaitingForApproval
import { useAuth } from './AuthContext';
import UserNavbar from './components/UserNavbar '; // Import UserNavbar
import UserFooter from './components/UserFooter '; // Import UserFooter
import './App.css'; // Import global styles

const App = () => {
  const { currentUser } = useAuth();

  const userRole = currentUser?.email === 'admin@gmail.com' ? 'admin' : 'user';

  return (
    <Router>
      {currentUser && userRole === 'user' && <UserNavbar />}
      <div className="content">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {currentUser ? (
            userRole === 'admin' ? (
              <>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/admin" />} />
              </>
            ) : (
              <>
                {currentUser.receiptStatus === 'approved' ? (
                  <>
                    <Route path="/" element={<MainPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </>
                ) : (
                  <>
                    <Route path="/upload-receipt" element={<ReceiptUpload />} />
                    <Route path="/waiting-for-approval" element={<WaitingForApproval />} />
                    <Route path="*" element={<Navigate to="/waiting-for-approval" />} />
                  </>
                )}
              </>
            )
          ) : (
            <Route path="*" element={<Navigate to="/signin" />} />
          )}
        </Routes>
      </div>
      {currentUser && userRole === 'user' && <UserFooter />}
    </Router>
  );
};

export default App;
