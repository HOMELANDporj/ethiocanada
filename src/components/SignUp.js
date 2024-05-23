import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebaseConfig'; // Import storage
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions
import { useLanguage } from '../LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap'; // Import Spinner from react-bootstrap
import './SignInStyles.js';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [passport, setPassport] = useState(null);
  const [idPic, setIdPic] = useState(null);
  const [picture, setPicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const email = `${phoneNumber}@gmail.com`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload files to Firebase Storage
      const uploadFile = async (file, path) => {
        if (!file) return '';
        const fileRef = ref(storage, path);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
      };

      const passportURL = await uploadFile(passport, `users/${user.uid}/passport`);
      const idPicURL = await uploadFile(idPic, `users/${user.uid}/idPic`);
      const pictureURL = await uploadFile(picture, `users/${user.uid}/picture`);

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        middleName,
        lastName,
        displayName: `${firstName} ${middleName}`,
        age,
        sex,
        passportURL,
        idPicURL,
        pictureURL,
        phoneNumber,
        email,
        uid: user.uid,
        role: 'user', // Default role is user
        verified: false,
        hasPendingReceipts: false,
      });

      alert('Registration successful!');
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Error signing up. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after sign-up process is complete
    }
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4" style={{ color: 'red' }}>
        {language === 'english' ? 'Sign Up' : 'ይመዝገቡ'}
      </h3>
      <form onSubmit={handleSignUp} style={{ color: 'red' }}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          >
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>{language === 'english' ? 'Passport' : 'ፓስፖርት'}</label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setPassport(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label>{language === 'english' ? 'ID Picture' : 'የመታወቂያ እቃ'}</label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setIdPic(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label>{language === 'english' ? 'Profile Picture' : 'የግል ፎቶ'}</label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setPicture(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            className="form-control"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger btn-block">
          {loading ? <Spinner animation="border" /> : (language === 'english' ? 'Sign Up' : 'ይመዝገቡ')}
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

export default SignUp;
