import {
    MODAL_ORDER_OPEN,
    MODAL_ORDER_CLOSE,
} from '../actions/actions'

const initialState = {
    isOpenOrder: false
}

export const orderModalReducer = (state = initialState, action) => {
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