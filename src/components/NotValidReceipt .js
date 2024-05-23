import React from 'react';
import ReceiptUpload from './ReceiptUpload'; // Import ReceiptUpload component

const NotValidReceipt = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2 style={{ color: 'red', marginBottom: '20px' }}>Not Valid Receipt</h2>
      <p>The receipt you uploaded has been rejected by the admin. Please upload a valid receipt.</p>
      <div style={{ marginTop: '20px' }}>
        <ReceiptUpload /> {/* Append ReceiptUpload component */}
      </div>
    </div>
  );
};

export default NotValidReceipt;
