import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles
import App from 'frontend\src\app.js'; // Import the main App component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
