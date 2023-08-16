import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    TGetOrderActions
} from '../actions/get-order-actions';
import {IOrder} from '../../utils/types';

export type TGetOrderState = {
    order: IOrder | null;
    ordersRequest: boolean;
    ordersFailed: boolean;
  };

const initialState: TGetOrderState = {
    order: null,
    ordersRequest: false,
    ordersFailed: false,
}

export const getOrdersReducer = (state = initialState, action: TGetOrderActions) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                ordersRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                ordersFailed: false,
                order: action.orders,
                ordersRequest: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                ordersFailed: true,
                ordersRequest: false
            };
        }
        default: {
            return state;
        }
    }
};