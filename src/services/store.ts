import { rootReducer } from "./reducers/root-reducer";

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
  wsErrorInProfile,
} from "./actions/actions-ws";
import { socketMiddleware } from "./middleware/socket-middleware";
import { configureStore } from "@reduxjs/toolkit";

export const ordersMiddlware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onMessage: wsMessage,
  onClose: wsClose,
  onError: wsError,
});

export const ordersProfileMiddlware = socketMiddleware({
  wsConnect: connectInProfile,
  wsDisconnect: disconnectInProfile,
  wsConnecting: wsConnectingInProfile,
  onOpen: wsOpenInProfile,
  onMessage: wsMessageInProfile,
  onClose: wsCloseInProfile,
  onError: wsErrorInProfile,
});

export const initStore = configureStore({
  reducer: {
   rootReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ordersMiddlware,
      ordersProfileMiddlware
    );
  },
});
