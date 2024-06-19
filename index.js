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
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

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

export const useSettings = () => useContext(SettingsContext);

document.addEventListener('DOMContentLoaded', () => {
  const rootNode = document.getElementById('root');
  if (rootNode) {
    ReactDOM.render(
      <SettingsSlider>
        <App />
      </SettingsSlider>, 
      rootNode
    );
  }
});