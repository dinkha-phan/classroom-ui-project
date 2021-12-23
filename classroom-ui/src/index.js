import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConxtextProvider } from './context/context';
import Drag from './components/GradeStruct/drag'
import CardView from './components/CardView/CardView'
ReactDOM.render(
    <ConxtextProvider>
        <Drag />
        <CardView/>
    </ConxtextProvider>
    ,
    document.getElementById('root')
);