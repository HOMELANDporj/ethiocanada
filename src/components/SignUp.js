import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { useLanguage } from '../LanguageContext';
import styles from './SignInStyles';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [passportURL, setPassportURL] = useState(''); // Store URL of uploaded passport image
  const [idPicURL, setIdPicURL] = useState(''); // Store URL of uploaded ID picture image
  const [pictureURL, setPictureURL] = useState(''); // Store URL of uploaded picture image
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const email = `${phoneNumber}@gmail.com`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        middleName,
        age,
        sex,
        passportURL,
        idPicURL,
        pictureURL,
        phoneNumber,
        email,
        uid: user.uid,
        verified: false
      });
      alert('Registration successful!');
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Error signing up. Please try again.');
    }
  };

  // Function to handle file upload for passport image
  const handlePassportUpload = (e) => {
    const file = e.target.files[0];
    // Implement file upload logic here, such as using Firebase Storage
    // Once the upload is complete, set the URL to the uploaded image
    // Example: setPassportURL(url);
  };

  // Function to handle file upload for ID picture image
  const handleIdPicUpload = (e) => {
    const file = e.target.files[0];
    // Implement file upload logic here, such as using Firebase Storage
    // Once the upload is complete, set the URL to the uploaded image
    // Example: setIdPicURL(url);
  };

  // Function to handle file upload for picture image
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    // Implement file upload logic here, such as using Firebase Storage
    // Once the upload is complete, set the URL to the uploaded image
    // Example: setPictureURL(url);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h3 className="text-center mb-4">{language === 'english' ? 'Sign Up' : 'ይመዝገቡ'}</h3>
        <form onSubmit={handleSignUp}>
          <div style={styles.formGroup}>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="text"
              className="form-control"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
          <select
              className="form-select"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            >
              <option value="Male">{language === 'english' ? 'Male' : 'ወንድ'}</option>
              <option value="Female">{language === 'english' ? 'Female' : 'ሴት'}</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <input
              type="file"
              className="form-control-file"
              onChange={handlePassportUpload}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="file"
              className="form-control-file"
              onChange={handleIdPicUpload}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="file"
              className="form-control-file"
              onChange={handlePictureUpload}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="tel"
              className="form-control"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" style={styles.button}>
            {language === 'english' ? 'Sign Up' : 'ይመዝገቡ'}
          </button>
        </form>
      </div>
      <div style={styles.languageSwitchContainer}>
        <button className="btn btn-danger" onClick={toggleLanguage} style={styles.languageSwitchButton}>
          {language === 'amharic' ? 'Switch to English' : 'ወደ አማርኛ መተየቢያ ቀይር'}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
