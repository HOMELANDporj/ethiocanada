import React from 'react';

const ReceiptPending = () => {
  return (
    <div className="container">
      <h3 className="text-center mb-4" style={{ color: 'red' }}>Receipt Pending</h3>
      <p>Your receipt is pending approval. You will be notified once it is approved.</p>
    </div>
  );
};

export default ReceiptPending;
