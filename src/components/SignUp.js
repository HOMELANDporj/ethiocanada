import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { useLanguage } from '../LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        middleName,
        lastName,
        displayName: firstName + ' ' + middleName, 
        age,
        sex,
        passportURL: passport ? URL.createObjectURL(passport) : '', // Temporary URL for demo purposes
        idPicURL: idPic ? URL.createObjectURL(idPic) : '', // Temporary URL for demo purposes
        pictureURL: picture ? URL.createObjectURL(picture) : '', // Temporary URL for demo purposes
        phoneNumber,
        email,
        uid: user.uid,
        role: 'user', // Default role is user
        verified: false,
        hasPendingReceipts:false

      });
      alert('Registration successful!');
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Error signing up. Please try again.');
    }
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4" style={{ color: 'red' }}>{language === 'english' ? 'Sign Up' : 'ይመዝገቡ'}</h3>
      <form onSubmit={handleSignUp}  style={{ color: 'red' }}>
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
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setPassport(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setIdPic(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
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
          {language === 'english' ? 'Sign Up' : 'ይመዝገቡ'}
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
