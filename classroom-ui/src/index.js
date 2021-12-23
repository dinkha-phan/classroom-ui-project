import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConxtextProvider } from './context/context';
import Drag from './components/GradeStruct/drag'

ReactDOM.render(
    <ConxtextProvider>
        <Drag />
    </ConxtextProvider>
    ,
    document.getElementById('root')
);