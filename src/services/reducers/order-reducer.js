import {
    MODAL_ORDER_OPEN,
    MODAL_ORDER_CLOSE,
    TAB_ORDER_NUMBER,
    TAB_ORDER_DELETE
} from '../actions/actions'

const initialState = {
    tabOrder: null,
    isOpenOrder: false
}

export const orderModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case TAB_ORDER_NUMBER: {
            return {
                ...state,
                tabOrder: action.tabOrder
            };
        }
        case TAB_ORDER_DELETE: {
            return {
                ...state,
                tabOrder: null
            };
        }
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