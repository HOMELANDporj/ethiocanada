import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [receiptStatus, setReceiptStatus] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const receiptsQuery = query(
            collection(db, 'receipts'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(receiptsQuery);
          if (!querySnapshot.empty) {
            const receipt = querySnapshot.docs[0].data();
            setReceiptStatus(receipt.status);
            console.log('Receipt Status:', receipt.status); // Log the receipt status
          } else {
            console.log('No receipt document found');
          }
        } catch (error) {
          console.error('Error fetching receipt status:', error);
        }
      } else {
        setCurrentUser(null);
        setReceiptStatus(null); // Reset receipt status when user logs out
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, receiptStatus }}>
      {children}
    </AuthContext.Provider>
  );
};


