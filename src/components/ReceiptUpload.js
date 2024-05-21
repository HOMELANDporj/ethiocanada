import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ReceiptUpload = () => {
  const [receipt, setReceipt] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleReceiptUpload = async (e) => {
    e.preventDefault();
    if (!receipt) {
      alert('Please select a receipt to upload');
      return;
    }

    const receiptRef = ref(storage, `receipts/${currentUser.uid}/${receipt.name}`);
    try {
      await uploadBytes(receiptRef, receipt);
      const receiptURL = await getDownloadURL(receiptRef);

      await addDoc(collection(db, 'receipts'), {
        userId: currentUser.uid,
        receiptURL,
        status: 'pending',
        timestamp: new Date()
      });

      alert('Receipt uploaded successfully. Waiting for admin approval.');
      navigate('/'); // Redirect to a suitable page after upload
    } catch (error) {
      console.error('Error uploading receipt:', error.message);
      alert('Error uploading receipt. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  return (
    <div>
      <h3>Upload Payment Receipt</h3>
      <form onSubmit={handleReceiptUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ReceiptUpload;
