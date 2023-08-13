import { getDataFetch } from '../../api/api';
import {IIngredient} from '../../utils/types';
import { AppDispatch } from '../../services/index';


export const GET_DATA_REQUEST: 'GET_DATA_REQUEST' = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS: 'GET_DATA_SUCCESS'= 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED: 'GET_DATA_FAILED' = 'GET_DATA_FAILED';

export interface IGetDataAction {
  readonly type: typeof GET_DATA_REQUEST;
}

export interface IGetDataFailedAction {
  readonly type: typeof GET_DATA_FAILED;
}

export interface IGetDataSuccessAction {
  readonly type: typeof GET_DATA_SUCCESS;
  readonly data: IIngredient[];
}

export type TBurgerIngredientsActions =
  | IGetDataAction
  | IGetDataFailedAction
  | IGetDataSuccessAction;

  export const getDataAction = (): IGetDataAction => ({
    type: GET_DATA_REQUEST
  });
  
  export const getDataFailedAction = (): IGetDataFailedAction => ({
    type: GET_DATA_FAILED
  });
  
  export const getDataSuccessAction = (
    data: IIngredient[]
  ): IGetDataSuccessAction => ({
    type: GET_DATA_SUCCESS,
    data
  });
  
  
// Наш первый thunk
export function getData() {
    return function (dispatch: AppDispatch) {
      dispatch(getDataAction())
      getDataFetch()
        .then(res => {
          if (res && res.success) {
            dispatch(getDataSuccessAction(res.data))
          }
        }).catch(err => {
          dispatch(getDataFailedAction())
        })
    }
  }