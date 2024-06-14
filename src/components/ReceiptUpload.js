import React, { useState } from 'react';
import { storage, db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLongPress } from 'react-use';
import './ReceiptUpload.css';
import fingerprint from '../images/fingerprint.png';
import fingerprintAccepted from '../images/fingerprint-accepted.png';

const ReceiptUpload = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFingerprintAccepted, setIsFingerprintAccepted] = useState(false);
  const [fingerprintPressCount, setFingerprintPressCount] = useState(0);

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

  const longPressEvent = useLongPress(() => {
    setFingerprintPressCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 3) {
        setIsFingerprintAccepted(true);
        alert('Fingerprint accepted!');
      }
      return newCount;
    });
  }, {
    isPreventDefault: true,
    filterEvents: (event) => event.touches && event.touches.length === 1,
  });

  return (
    <div className="receipt-upload-container">
      <h2>Upload Receipt</h2>
      <div 
        className={`fingerprint-container ${isFingerprintAccepted ? 'accepted' : ''}`}
        {...longPressEvent}
      >
        <img 
          src={isFingerprintAccepted ? fingerprintAccepted : fingerprint} 
          alt="fingerprint" 
          className="fingerprint-image" 
        />
        {isFingerprintAccepted && <p className="fingerprint-message">Fingerprint accepted!</p>}
        {!isFingerprintAccepted && <p className="fingerprint-message">Press 3 times to accept fingerprint</p>}
        <p className="fingerprint-count">Press count: {fingerprintPressCount}</p>
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
