import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConxtextProvider } from './context/context';


ReactDOM.render(
    <ConxtextProvider>
        <App />
    </ConxtextProvider>
    ,
    document.getElementById('root')
);