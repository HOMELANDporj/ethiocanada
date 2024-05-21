import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AdminPendingReceipts = () => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      const receiptDocs = await getDocs(collection(db, 'receipts'));
      const pendingReceipts = receiptDocs.docs.filter(doc => doc.data().status === 'pending');
      setReceipts(pendingReceipts.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchReceipts();
  }, []);

  const handleApprove = async (receiptId, userId) => {
    await updateDoc(doc(db, 'receipts', receiptId), { status: 'approved' });
    await updateDoc(doc(db, 'users', userId), { receiptStatus: 'approved' });
    setReceipts(receipts.filter(receipt => receipt.id !== receiptId));
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4" style={{ color: 'red' }}>Pending Receipts</h3>
      {receipts.length === 0 ? (
        <p>No pending receipts.</p>
      ) : (
        receipts.map(receipt => (
          <div key={receipt.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">User ID: {receipt.userId}</h5>
              <a href={receipt.receiptURL} target="_blank" rel="noopener noreferrer" className="btn btn-link">View Receipt</a>
              <button className="btn btn-success" onClick={() => handleApprove(receipt.id, receipt.userId)}>Approve</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPendingReceipts;
