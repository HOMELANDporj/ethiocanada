import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ReceiptUpload from './components/ReceiptUpload';
import AdminPage from './components/AdminPage';
import MainPage from './components/MainPage';
import WaitingForApproval from './components/WaitingForApproval';
import NotValidReceipt from './components/NotValidReceipt ';
import { useAuth } from './AuthContext';
import UserNavbar from './components/UserNavbar ';
import UserFooter from './components/UserFooter ';
import ProfilePage from './components/ProfilePage';
import AboutUs from './components/AboutUs';
import PreviewImagesPage from './components/PreviewImagesPage';
import './App.css';

const App = () => {
  const { currentUser, receiptStatus } = useAuth();
  const userRole = currentUser?.email === 'admin@gmail.com' ? 'admin' : 'user';

  console.log('Current User:', currentUser);
  console.log('Receipt Status:', receiptStatus);

  let renderRoutes;

  if (currentUser) {
    if (userRole === 'admin') {
      renderRoutes = (
        <>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      );
    } else {
      switch (receiptStatus) {
        case 'approved':
          renderRoutes = (
            <>
              <Route path="/userpage" element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="*" element={<Navigate to="/userpage" />} />
            </>
          );
          break;
        case 'pending':
          renderRoutes = (
            <>
              <Route path="/waiting-for-approval" element={<WaitingForApproval />} />
              <Route path="*" element={<Navigate to="/waiting-for-approval" />} />
            </>
          );
          break;
        case 'rejected':
          renderRoutes = (
            <>
              <Route path="/not-valid-receipt" element={<NotValidReceipt />} />
              <Route path="/upload-receipt" element={<ReceiptUpload />} />
              <Route path="*" element={<Navigate to="/not-valid-receipt" />} />
            </>
          );
          break;
        default:
          renderRoutes = (
            <>
              <Route path="/preview-images" element={<PreviewImagesPage />} />
              <Route path="/upload-receipt" element={<ReceiptUpload />} />
              <Route path="*" element={<Navigate to="/preview-images" />} />
            </>
          );
          break;
      }
    }
  } else {
    renderRoutes = (
      <>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </>
    );
  }

  return (
    <Router>
      <div className="wrapper">
        {currentUser && userRole === 'user' && <UserNavbar />}
        <div className="content">
          <Routes>
            {renderRoutes}
          </Routes>
        </div>
        <UserFooter />
      </div>
    </Router>
  );
};

export default App;
