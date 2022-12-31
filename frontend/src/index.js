import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MainContext } from './utils/context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MainContext>
        <App />
    </MainContext>
);
