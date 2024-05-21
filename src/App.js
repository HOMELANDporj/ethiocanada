import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ReceiptUpload from './components/ReceiptUpload';
import AdminPage from './components/AdminPage';
import MainPage from './components/MainPage';  // Import MainPage
import { useAuth } from './AuthContext';

const App = () => {
  const { currentUser } = useAuth();

  const userRole = currentUser?.email === 'admin@gmail.com' ? 'admin' : 'user';

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {currentUser ? (
          <>
            {userRole === 'admin' ? (
              <Route path="/admin" element={<AdminPage />} />
            ) : (
              <>
                {currentUser.receiptStatus === 'approved' ? (
                  <Route path="/" element={<MainPage />} />
                ) : (
                  <Route path="/upload-receipt" element={<ReceiptUpload />} />
                )}
              </>
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
