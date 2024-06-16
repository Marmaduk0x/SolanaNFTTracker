import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  const rootNode = document.getElementById('root');
  if (rootNode) {
    ReactDOM.render(<App />, rootNode);
  }
});