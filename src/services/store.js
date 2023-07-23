import { rootReducer } from './reducers/root-reducer';
import {
    connect,
    disconnect,
    wsOpen,
    wsClose,
    wsMessage,
    wsError,
    wsConnecting,
    connectInProfile,
    disconnectInProfile,
    wsConnectingInProfile,
    wsOpenInProfile,
    wsCloseInProfile,
    wsMessageInProfile,
    wsErrorInProfile
} from './actions/actions-ws';
import { socketMiddleware } from './middleware/socket-middleware';
import { configureStore } from '@reduxjs/toolkit';

const ordersMiddlware = socketMiddleware({
    wsConnect: connect,
    wsDisconnect: disconnect,
    wsConnecting: wsConnecting,
    onOpen: wsOpen,
    onMessage: wsMessage,
    onClose: wsClose,
    onError: wsError,
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

