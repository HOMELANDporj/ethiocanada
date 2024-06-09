import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SignInStyles.js';
import { Spinner } from 'react-bootstrap';

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = `${phoneNumber}@gmail.com`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (email === 'admin@gmail.com') {
          navigate('/welcome-admin');
        } else if (!userData.hasUploadedReceipt) {
          navigate('/upload-receipt');
        } else if (userData.receiptStatus === 'pending') {
          navigate('/pending-approval');
        } else if (userData.receiptStatus === 'approved') {
          navigate('/welcome-user');
        }
      } else {
        console.error('No such document!');
        setError('No such document!');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError('Error signing in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4" style={styles.largeRedText}>
        {language === 'english' ? 'Welcome to Ethio Canada Portal' : 'እንኳን ወደ ኢትዮ ካናዳ ፖርትአል በደህና መጡ'}
      </h1>
      <div style={styles.container}>
        {error && <p style={styles.textDanger}>{error}</p>}
        <form onSubmit={handleSignIn} style={styles.formContainer}>
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.textDanger}>
              {language === 'english' ? 'Phone Number' : 'ስልክ ቁጥር'}
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.textDanger}>
              {language === 'english' ? 'Password' : 'የይለፍ ቃል'}
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger btn-block" style={styles.button}>
            {loading ? <Spinner animation="border" /> : language === 'english' ? 'Sign In' : 'ግባ'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={toggleLanguage}>
            {language === 'amharic' ? 'Switch to English' : 'ወደ አማርኛ ቋንቋ ቀይር'}
          </button>
        </div>
        <div className="text-center mt-4">
          <p>{language === 'english' ? "Don't have an account?" : 'መለያ አልሰሩም?'}</p>
          <button className="btn btn-link" onClick={() => navigate('/signup')} style={styles.signUpLink}>
            {language === 'english' ? 'Sign up here' : 'እዚህ ይመዝገቡ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
