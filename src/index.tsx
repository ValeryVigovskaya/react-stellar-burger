import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
//import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
//import { rootReducer } from './services/reducers/root-reducer';
//import thunk from 'redux-thunk';
import { BrowserRouter as Router} from 'react-router-dom';
//import { socketMiddleware } from '../src/services/middleware/socket-middleware';
//import { connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../src/services/actions/actions-ws';
import { initStore } from './services/store';


//const store = initStore();

//const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={initStore}>  
      <App />
    </Provider></Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
