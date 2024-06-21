import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const SettingsContext = createContext();

const defaultSettings = {
  currency: 'USD',
  theme: 'light',
  language: 'en',
  notifications: true,
};

const SettingsSlider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    return JSON.parse(localStorage.getItem('settings')) || defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

ReactDOM.render(
  <SettingsSlider>
    <App />
  </SettingsSlider>, 
  document.getElementById('root')
);