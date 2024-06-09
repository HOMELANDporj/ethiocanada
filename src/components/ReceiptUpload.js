import React, { useState, useEffect } from 'react';
import { storage, db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './ReceiptUpload.css';
import fingerprint from '../images/fingerprint.png';
import fingerprintAccepted from '../images/fingerprint-accepted.png';

const ReceiptUpload = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFingerprintAccepted, setIsFingerprintAccepted] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('You must be logged in to upload a receipt.');
      return;
    }

    if (!file) {
      alert('Please select a file first.');
      return;
    }

    if (!isFingerprintAccepted) {
      alert('Please accept fingerprint first.');
      return;
    }

    const storageRef = ref(storage, `receipts/${currentUser.uid}/${file.name}`);
    setLoading(true);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log('User Data:', userData); // Logging user data for debugging
        const userName = `${userData.firstName} ${userData.lastName} ${userData.middleName}`;

        await addDoc(collection(db, 'receipts'), {
          userId: currentUser.uid,
          userName,
          receiptURL: downloadURL,
          timestamp: serverTimestamp(),
          status: 'pending'
        });

        await updateDoc(userRef, {
          hasUploadedReceipt: true,
          receiptStatus: 'pending'
        });

        alert('Receipt uploaded successfully!');
        navigate('/waiting-for-approval');
      } else {
        console.error('User data not found for UID:', currentUser.uid); // Logging user ID for debugging
      }
    } catch (error) {
      console.error('Error uploading receipt:', error);
      alert('Error uploading receipt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDown = () => {
    setIsPressing(true);
  };

  const handleMouseUp = () => {
    setIsPressing(false);
  };

  useEffect(() => {
    let timer;
    if (isPressing) {
      timer = setTimeout(() => {
        setIsFingerprintAccepted(true);
        alert('Fingerprint accepted!');
      }, 4000); // 5 seconds
    } else {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [isPressing]);

  return (
    <div className="receipt-upload-container">
      <h2>Upload Receipt</h2>
      <div 
        className={`fingerprint-container ${isFingerprintAccepted ? 'accepted' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
          src={isFingerprintAccepted ? fingerprintAccepted : fingerprint} 
          alt="fingerprint" 
          className="fingerprint-image" 
        />
        {isFingerprintAccepted && <p className="fingerprint-message">Fingerprint accepted!</p>}
      </div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" className="btn btn-primary" disabled={!isFingerprintAccepted || loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default ReceiptUpload;
