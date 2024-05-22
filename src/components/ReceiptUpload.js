import React, { useState } from 'react';
import { storage, db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const ReceiptUpload = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
  
    const storageRef = ref(storage, `receipts/${currentUser.uid}/${file.name}`);
  
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
  
      // Fetch the user's data from Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userName = `${userData.firstName} ${userData.lastName} ${userData.middleName}`;
        // Add the user's name to the receipt data
        await addDoc(collection(db, 'receipts'), {
          userId: currentUser.uid,
          userName,
          receiptURL: downloadURL,
          timestamp: serverTimestamp(),
          status: 'pending'
        });
      } else {
        console.error('User data not found.');
      }
  
      alert('Receipt uploaded successfully!');
      navigate('/waiting-for-approval'); // Redirect after successful upload
    } catch (error) {
      console.error('Error uploading receipt:', error);
      alert('Error uploading receipt. Please try again.');
    }
  };
  
  return (
    <div>
      <h2>Upload Receipt</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ReceiptUpload;











