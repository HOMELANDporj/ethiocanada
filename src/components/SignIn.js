// SignIn.js

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import styles from './SignInStyles';
import { useLanguage } from '../LanguageContext';

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { language, toggleLanguage, switcherButtonStyle } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = phoneNumber + '@gmail.com';
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 className="text-center mb-4" style={styles.largeRedText}>
          {language === 'english' ? 'Welcome to Ethio Canada Portal' : 'እንኳን ወደ ኢትዮ ካናዳ መመዝገቢያ ፖርታል በደህና መጡ'}
        </h2>
        <h3 className="text-center mb-4">{language === 'english' ? 'Sign In' : 'መግቢያ'}</h3>
        {error && <p style={styles.textDanger}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="tel"
              className="form-control"
              placeholder={language === 'english' ? 'Enter phone number' : 'ስልኩን ያስገቡ'}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="password"
              className="form-control"
              placeholder={language === 'english' ? 'Enter password' : 'የይለፍ ቃል ያስገቡ'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" style={styles.button}>
            {language === 'english' ? 'Sign In' : 'ግባ'}
          </button>
        </form>
        <p className="mt-3 text-center">
          {language === 'english' ? "Don't have an account? " : "ካልተመዘገቡ እባኮት 'እዚህ' ይጫኑ "}
          <a href="https://t.me/Sami_Eagle" target="_blank" rel="noopener noreferrer">
            {language === 'english' ? 'Click here' : 'እዚህ'}
          </a>
        </p>
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button
          className="btn"
          style={{ backgroundColor: 'red', color: 'white' }}
          onClick={toggleLanguage}
        >
          {language === 'english' ? 'Switch to Amharic' : 'Switch to English'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
