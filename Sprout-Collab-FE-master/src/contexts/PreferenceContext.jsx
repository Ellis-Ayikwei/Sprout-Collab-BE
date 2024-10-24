// PreferencesContext.js
import React, { createContext, useContext, useState } from 'react';

const PreferencesContext = createContext();

export const usePreferences = () => useContext(PreferencesContext);

export const PreferencesProvider = ({ children }) => {
  const [isPreferencesVisible, setIsPreferencesVisible] = useState(false);

  const showPrefs = () => {
    return setIsPreferencesVisible(true)};
    
  const hidePrefs = () => setIsPreferencesVisible(false);

  return (
    <PreferencesContext.Provider value={{ isPreferencesVisible, showPrefs, hidePrefs }}>
      {children}
    </PreferencesContext.Provider>
  );
};