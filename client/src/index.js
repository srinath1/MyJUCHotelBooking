import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reportWebVitals from "./reportWebVitals";
import rootReducer from './reducers';
import './index.css';
import 'antd/dist/antd.css'




// 4. create redux store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
   
  <Provider store={store}>
  <App />
</Provider>,
   
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
