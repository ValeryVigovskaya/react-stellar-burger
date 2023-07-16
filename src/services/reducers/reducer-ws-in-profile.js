import {
    wsConnectingInProfile,
    wsOpenInProfile,
    wsCloseInProfile,
    wsMessageInProfile,
    wsErrorInProfile
  } from '../actions/actions-ws';
  import { WebsocketStatus } from '../../utils/orders';
  import { createReducer } from '@reduxjs/toolkit';
  import update from 'immutability-helper'
  
  const initialState = {
    status: WebsocketStatus.OFFLINE,
    massiv: [],
    connectionError: '',
    loader: false
  };
  
  export const ordersInProfileReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(wsConnectingInProfile, state => {
            state.status = WebsocketStatus.CONNECTING;
            state.loader = true;
        })
      .addCase(wsOpenInProfile, state => {
          state.status = WebsocketStatus.ONLINE;
          state.connectionError = '';
          state.loader = true;
      })
      .addCase(wsMessageInProfile, (state, action) => {
        state.massiv = action.payload;
        state.loader = false;
      })
      .addCase(wsCloseInProfile, state => {
          state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsErrorInProfile, (state, action) => {
          state.connectionError = action.payload;
      })
      
  })