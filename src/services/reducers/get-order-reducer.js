import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../actions/actions'

const initialState = {
    order: [],
    ordersRequest: false,
    ordersFailed: false,
}

export const getOrdersReducer = (state = initialState, action) => {
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
                order: action.order,
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