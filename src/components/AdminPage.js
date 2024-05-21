import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

const AdminPage = () => {
  const [receipts, setReceipts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchReceipts = async () => {
      const q = query(collection(db, 'receipts'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const receiptsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReceipts(receiptsData);
    };

    if (currentUser?.email === 'admin@gmail.com') {
      fetchReceipts();
    }
  }, [currentUser]);

  const handleApprove = async (id, userId) => {
    const receiptDoc = doc(db, 'receipts', id);
    await updateDoc(receiptDoc, { status: 'approved' });

    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { receiptStatus: 'approved' });

    setReceipts(receipts.filter(receipt => receipt.id !== id));
  };

  return (
    <div>
      <h3>Pending Receipts</h3>
      {receipts.length === 0 ? (
        <p>No pending receipts</p>
      ) : (
        <ul>
          {receipts.map((receipt) => (
            <li key={receipt.id}>
              <a href={receipt.receiptURL} target="_blank" rel="noopener noreferrer">View Receipt</a>
              <button onClick={() => handleApprove(receipt.id, receipt.userId)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
