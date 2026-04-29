import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Neon console styling
const neonLog = (message, type = 'info') => {
  const styles = {
    success: 'color: #00ffff; font-size: 14px; font-weight: bold; text-shadow: 0 0 5px #00ffff;',
    error: 'color: #ff3366; font-size: 14px; font-weight: bold;',
    warning: 'color: #ff9933; font-size: 14px; font-weight: bold;',
    info: 'color: #00ccff; font-size: 14px; font-weight: bold;'
  };
  
  console.log(`%c${message}`, styles[type]);
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Neon startup message
neonLog('═══════════════════════════════════════', 'info');
neonLog('     NEON DASHBOARD ACTIVE', 'success');
neonLog('═══════════════════════════════════════', 'info');
neonLog('✓ Application mounted successfully', 'success');
neonLog('✓ Neon theme initialized', 'success');
neonLog('✓ Ready for tasks', 'success');
neonLog('═══════════════════════════════════════', 'info');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);