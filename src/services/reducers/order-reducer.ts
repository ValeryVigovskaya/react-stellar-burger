import {
    MODAL_ORDER_OPEN,
    MODAL_ORDER_CLOSE,
    TModalOrderActions
} from '../actions/modal-order-actions';

export type TModalOrderState = {
    isOpenOrder: boolean;
  };

const initialState: TModalOrderState = {
    isOpenOrder: false
}

export const orderModalReducer = (state = initialState, action: TModalOrderActions) => {
    switch (action.type) {
        case MODAL_ORDER_OPEN: {
            return {
                ...state,
                isOpenOrder: true
            };
        }
        case MODAL_ORDER_CLOSE: {
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