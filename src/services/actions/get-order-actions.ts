import { getOrdersFetch } from '../../api/api';
import {IOrder} from '../../utils/types';
import { AppDispatch } from '../../services/index';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetOrderAction {
    readonly type: typeof GET_ORDER_REQUEST;
  }
  
  export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
  }
  
  export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly orders: IOrder;
  }
  
  export type TGetOrderActions =
    | IGetOrderAction 
    | IGetOrderFailedAction
    | IGetOrderSuccessAction;

// Наш первый thunk
export function getOrder(number: number) {
    // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
    return function (dispatch: AppDispatch) {
      dispatch(getOrderAction())
      // Запрашиваем данные у сервера
      getOrdersFetch(number)
      .then(res => {
        if (res && res.success) {
            dispatch(getOrderSuccessAction(res.orders[0]))
        }}).catch(err => {
          // Если сервер не вернул данных, также отправляем экшен об ошибке
          dispatch(getOrderFailedAction())
        })
    }
  }

  export const getOrderAction = (): IGetOrderAction => ({
    type: GET_ORDER_REQUEST
  });
  
  export const getOrderFailedAction = (): IGetOrderFailedAction => ({
    type: GET_ORDER_FAILED
  });
  
  export const getOrderSuccessAction = (
    orders: IOrder
  ): IGetOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
    orders
  });

