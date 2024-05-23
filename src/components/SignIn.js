import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignInStyles.js';

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const email = `${phoneNumber}@gmail.com`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (email === 'admin@gmail.com') {
          navigate('/welcome-admin');
        } else if (userData.receiptStatus === 'approved') {
          navigate('/welcome-user');
        } else {
          navigate('/upload-receipt');
        }
      } else {
        console.error('No such document!');
        setError('No such document!');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError('Error signing in. Please try again.');
    }
  };

  return (
    <div className="container">
      {/* <h1 className="text-center mb-4" style={{ color: 'red' }}>Welcome to Ethio Canada Portal</h1> */}
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="phone" style={{ color: 'red' }}>{language === 'english' ? 'Phone Number' : 'ስልክ ቁጥር'}</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ color: 'red' }}>{language === 'english' ? 'Password' : 'የይለፍ ቃል'}</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger btn-block">
          {language === 'english' ? 'Sign In' : 'ግባ'}
        </button>
      </form>
      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={toggleLanguage}>
          {language === 'amharic' ? 'Switch to English' : 'ወደ አማርኛ ቋንቋ ቀይር'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
