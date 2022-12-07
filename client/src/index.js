import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import thunk from 'redux-thunk'
import{createStore,applyMiddleware} from 'redux'
import{Provider} from 'react-redux'
import {reducer} from "../src/redux/reducer"
import reportWebVitals from './reportWebVitals';
const store = createStore(reducer,applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />

    </Provider>
  </React.StrictMode>
);


reportWebVitals();
