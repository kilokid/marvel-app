import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
