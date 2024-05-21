// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import WelcomeUser from './components/WelcomeUser';
import WelcomeAdmin from './components/WelcomeAdmin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/welcome-user" element={<WelcomeUser />} />
        <Route path="/welcome-admin" element={<WelcomeAdmin />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
