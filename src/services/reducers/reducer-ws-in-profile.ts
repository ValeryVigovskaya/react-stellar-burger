import {
    wsConnectingInProfile,
    wsOpenInProfile,
    wsCloseInProfile,
    wsMessageInProfile,
    wsErrorInProfile
  } from '../actions/actions-ws';
  import { WebsocketStatus } from '../../utils/orders';
  import { createReducer } from '@reduxjs/toolkit';
  //import update from 'immutability-helper';
  import { IOrder } from '../../utils/types';
  
  export type TWSInProfileState = {
    status: string,
    orders: readonly IOrder[],
    connectionError: string,
    loader: boolean
  };
  
  const initialState: TWSInProfileState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
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
      .addCase(wsMessageInProfile, (state, { payload }: any) => {
        state.orders = payload.orders ?? [];
        state.loader = false;
      })
      .addCase(wsCloseInProfile, state => {
          state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsErrorInProfile, (state, { payload }) => {
          state.connectionError = payload ?? '';
      })
      
  })