import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IRouter from './router';
import {store} from "./redux/stores/index";
import { Provider } from "react-redux";



ReactDOM.render(
    <Provider store={store}>
        <IRouter />
    </Provider>,
    document.getElementById('root'));
