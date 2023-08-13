import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  TBurgerIngredientsActions
} from '../actions/burger-ingredients-actions';
import {IIngredient} from '../../utils/types';

export type TIngredientsState = {
  burgerIngredients: IIngredient[];
  burgerIngredientsRequest: boolean;
  burgerIngredientsFailed: boolean;
};


const initialState: TIngredientsState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,
}

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions) => {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return {
        ...state,
        burgerIngredientsRequest: true
      };
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        burgerIngredientsFailed: false,
        burgerIngredients: action.data,
        burgerIngredientsRequest: false
      };
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        burgerIngredientsFailed: true,
        burgerIngredientsRequest: false
      };
    }
    default: {
      return state;
    }
  }
};