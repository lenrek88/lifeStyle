import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import {rootReducer} from "./store/reducers";

export const ACTION_CHANGE_AVAILABILITY_FOOD = 'ACTION_CHANGE_AVAILABILITY_FOOD';
export const ACTION_CLEAR_AVAILABILITY_FOOD = 'ACTION_CLEAR_AVAILABILITY_FOOD';
export const ACTION_CLEAR_FOOD_ITEM = 'ACTION_CLEAR_FOOD_ITEM';

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


reportWebVitals();
