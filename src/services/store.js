import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers/root-reducer';
import {
    connect as OrdersWsConnect,
    disconnect as OrdersWsDisconnect,
    wsOpen as OrdersWsOpen,
    wsClose as OrdersWsClose,
    wsMessage as OrdersWsMessage,
    wsError as OrdersWsError,
    wsConnecting as OrdersWsConnecting,
    connectInProfile,
    disconnectInProfile,
    wsConnectingInProfile,
    wsOpenInProfile,
    wsCloseInProfile,
    wsMessageInProfile,
    wsErrorInProfile
} from './actions/actions-ws';
import { socketMiddleware } from './middleware/socket-middleware';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { ordersReducer } from '../services/reducers/reducer-ws';

const ordersMiddlware = socketMiddleware({
    wsConnect: OrdersWsConnect,
    wsDisconnect: OrdersWsDisconnect,
    wsConnecting: OrdersWsConnecting,
    onOpen: OrdersWsClose,
    onMessage: OrdersWsMessage,
    onClose: OrdersWsOpen,
    onError: OrdersWsError,
});

const ordersProfileMiddlware = socketMiddleware({
    wsConnect: connectInProfile,
    wsDisconnect: disconnectInProfile,
    wsConnecting: wsConnectingInProfile,
    onOpen: wsOpenInProfile,
    onMessage: wsMessageInProfile,
    onClose: wsCloseInProfile,
    onError: wsErrorInProfile,
});



//const composeEnhancers =
//typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//: compose;

//const enhancer = composeEnhancers(applyMiddleware(thunk));

export const initStore =
    configureStore({
        reducer: {
            rootReducer: rootReducer,
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(ordersMiddlware,  ordersProfileMiddlware);
        },
    }

    );

