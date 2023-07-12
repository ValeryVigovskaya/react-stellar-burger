import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsMessage,
  wsError
} from '../actions/actions-ws';
import { WebsocketStatus } from '../../utils/orders';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  status: WebsocketStatus.OFFLINE,
  massiv: [],
  connectionError: ''
};

export const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
      })
    .addCase(wsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = '';
    })
    .addCase(wsMessage, (state, action) => {
      state.massiv = action.payload
    })
    .addCase(wsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
        state.connectionError = action.payload;
    })
    
})