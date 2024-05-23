import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, getDoc, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [pendingReceipts, setPendingReceipts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const fetchSenderDisplayName = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId)); // Await here
      return userDoc.exists() ? userDoc.data().displayName : 'Unknown Sender';
    } catch (error) {
      console.error('Error fetching sender display name:', error);
      return 'Unknown Sender';
    }
  };

  useEffect(() => {
    const fetchPendingReceipts = async () => {
      try {
        const q = query(collection(db, 'receipts'), where('status', '==', 'pending'));
        const querySnapshot = await getDocs(q);
        const receipts = [];
        for (const docSnap of querySnapshot.docs) {
          const data = docSnap.data();
          const senderDisplayName = await fetchSenderDisplayName(data.userId);
          receipts.push({ id: docSnap.id, ...data, displayName: senderDisplayName });
        }
        setPendingReceipts(receipts);
      } catch (error) {
        console.error('Error fetching pending receipts:', error);
        setPendingReceipts([]);
      } finally {
        setLoading(false); // Update loading state after fetching completes
      }
    };

    fetchPendingReceipts();
  }, []);

  const handleConfirm = async (receiptId, userId) => {
    try {
      await updateDoc(doc(db, 'receipts', receiptId), { status: 'approved' });
      alert('Receipt approved!');
      setPendingReceipts(pendingReceipts.filter(receipt => receipt.id !== receiptId));
      // Optionally, you could notify the user or update their status here
    } catch (error) {
      console.error('Error confirming receipt:', error);
      alert('Error confirming receipt. Please try again.');
    }
  };

  const handleReject = async (receiptId, userId) => {
    try {
      await updateDoc(doc(db, 'receipts', receiptId), { status: 'rejected' });
      alert('Receipt rejected!');
      setPendingReceipts(pendingReceipts.filter(receipt => receipt.id !== receiptId));
    } catch (error) {
      console.error('Error rejecting receipt:', error);
      alert('Error rejecting receipt. Please try again.');
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  if (currentUser.email !== 'admin@gmail.com') {
    return <div>You do not have permission to view this page.</div>;
  }

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/signin');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div>
      <button onClick={handleLogout} style={{
         fontSize: '12px',
          padding: '5px 10px',
           marginRight: '-680px',
            marginTop:'-120px', 
            borderRadius:'50px',
            backgroundColor:'red',
            color:'white',
            borderBlockStyle:"none",
            borderBlockColor:'red'}}>
        Sign Out
      </button>
        <h2 style={{ color: 'red', marginBottom: '20px' }}>Pending Receipts</h2>
      </div>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : pendingReceipts.length === 0 ? (
        
        <p>No pending receipts.</p>
      ) : (
      
        <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'left' }}>Receipt</th>
              <th style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'left' }}>Sender</th>
              <th style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingReceipts.map(receipt => (
              <tr key={receipt.id} style={{ backgroundColor: 'lightgray' }}>
                <td style={{ padding: '10px', textAlign: 'left' }}><a href={receipt.receiptURL} target="_blank" rel="noopener noreferrer" style={{ color: 'red', textDecoration: 'none' }}>View Receipt</a></td>
                <td style={{ padding: '10px', color: 'red', textAlign: 'left' }}>{receipt.displayName}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>
                  <button onClick={() => handleConfirm(receipt.id, receipt.userId)} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>Confirm</button>
                  <button onClick={() => handleReject(receipt.id, receipt.userId)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '20px', cursor: 'pointer' }} onClick={() => window.location.href = '/signup'}>Register New User</button>
      </div>
    </div>
  );
};

export default AdminPage;


// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{userId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;
//     }
//     match /receipts/{receiptId} {
//       allow create: if request.auth != null;
//       allow read: if request.auth != null && (request.auth.token.admin == true || request.auth.uid == resource.data.userId);
//       allow update: if request.auth != null && request.auth.token.admin == true;
//     }
//   }
// }
