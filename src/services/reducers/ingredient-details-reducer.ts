import {
  TAB_INGREDIENT,
  TAB_INGREDIENT_DELETE,
  MODAL_INGREDIENT_DETAILS_OPEN,
  MODAL_INGREDIENT_DETAILS_CLOSE,
  TIngredientDetailsActions
} from '../actions/ingredient-deteils-actions';
import {IIngredient} from '../../utils/types';

export type TIngredientDetailsState = {
  tabIngredient: IIngredient | null;
  isOpenIngredient: boolean;
};

const initialState: TIngredientDetailsState = {
  tabIngredient: null,
  isOpenIngredient: false,
}

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case TAB_INGREDIENT: {
      return {
        ...state,
        tabIngredient: action.tabIngredient
      };
    }
    case TAB_INGREDIENT_DELETE: {
      return {
        ...state,
        tabIngredient: null
      };
    }
    case MODAL_INGREDIENT_DETAILS_OPEN: {
      return {
        ...state,
        isOpenIngredient: true
      };
    }
    case MODAL_INGREDIENT_DETAILS_CLOSE: {
      return {
        ...state,
        isOpenIngredient: false
      };
    }
    default: {
      return state;
    }
  }
};