import React from 'react';

const ReceiptPending = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'red' }}>Receipt Pending</h3>
      <p>Your receipt is pending approval. You will be notified once it is approved.</p>
    </div>
  );
};

export default ReceiptPending;
