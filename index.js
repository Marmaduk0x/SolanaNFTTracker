import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Creating a context for user settings
const SettingsContext = createContext();

// Creating a provider component
const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    currency: 'USD', // Default value, can be enhanced as needed
  });

  // Function to update settings, can be expanded with more functionality
  const updateSettings = (newSettings) => {
    setSettings(currentSettings => ({
      ...currentSettings,
      ...newSettings,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the settings context
export const useSettings = () => useContext(SettingsContext);

// Updated component tree with SettingsProvider
document.addEventListener('DOMContentLoaded', () => {
  const rootNode = document.getElementById('root');
  if (rootNode) {
    ReactDOM.render(
      <SettingsProvider>
        <App />
      </SettingsProvider>, 
      rootNode
    );
  }
});