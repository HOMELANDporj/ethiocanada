// LanguageContext.js

import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'amharic' : 'english');
  };

  // Style for the language switcher button
  const switcherButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'red',
    color: 'white',
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, switcherButtonStyle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
