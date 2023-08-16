import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
} from '../actions/actions-ws';
import { WebsocketStatus } from '../../utils/orders';
import { createReducer, AnyAction } from '@reduxjs/toolkit';
import { IOrder, IOrders} from '../../utils/types';

export type wsState = {
  status: string,
  orders: IOrder[],
  connectionError: string,
  loader: boolean,
  total: number | null,
  totalToday: number | null
};

const initialState: wsState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectionError: '',
  loader: false,
  total: null,
  totalToday: null
};

export const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
          state.loader = true;
      })
    .addCase(wsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = '';
        state.loader = true;
    })
    .addCase(wsMessage, (state, {payload}: any) => {
      state.orders = payload.orders ?? [];
      state.total = payload.total ?? null;
      state.totalToday = payload.totalToday ?? null;
      state.loader = false;
    })
    .addCase(wsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, { payload }) => {
        state.connectionError = payload ?? '';
    })
    
})