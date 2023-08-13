import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  MODAL_ORDER_DETAILS_OPEN,
  MODAL_ORDER_DETAILS_CLOSE,
  TOrderDetailsActions
} from '../actions/order-details-actions';
import {TOrder} from '../../utils/types';

export type TOrderDetailsState = {
  currOrder: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
  isOpenOrder: boolean
};

const initialState: TOrderDetailsState = {
  currOrder: null,
  orderRequest: false,
  orderFailed: false,
  isOpenOrder: false
}

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        currOrder: action.order,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      };
    }
    case MODAL_ORDER_DETAILS_OPEN: {
      return {
        ...state,
        isOpenOrder: true
      };
    }
    case MODAL_ORDER_DETAILS_CLOSE: {
      return {
        ...state,
        isOpenOrder: false
      };
    }
    default: {
      return state;
    }
  }
};