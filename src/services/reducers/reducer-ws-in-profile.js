import {
    wsConnectingInProfile,
    wsOpenInProfile,
    wsCloseInProfile,
    wsMessageInProfile,
    wsErrorInProfile
  } from '../actions/actions-ws';
  import { WebsocketStatus } from '../../utils/orders';
  import { createReducer } from '@reduxjs/toolkit';
  
  const initialState = {
    status: WebsocketStatus.OFFLINE,
    massiv: [],
    connectionError: ''
  };
  
  export const ordersInProfileReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(wsConnectingInProfile, state => {
            state.status = WebsocketStatus.CONNECTING;
        })
      .addCase(wsOpenInProfile, state => {
          state.status = WebsocketStatus.ONLINE;
          state.connectionError = '';
      })
      .addCase(wsMessageInProfile, (state, action) => {
        state.massiv = action.payload
      })
      .addCase(wsCloseInProfile, state => {
          state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsErrorInProfile, (state, action) => {
          state.connectionError = action.payload;
      })
      
  })