import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
