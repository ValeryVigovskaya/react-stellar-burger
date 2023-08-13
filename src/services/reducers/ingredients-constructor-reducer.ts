import {
  ADD_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_BUN,
  DELETE_INGREDIENTS_CONSTRUCTOR,
  MOVE_INGREDIENT_ITEM,
  CLEAR_INGREDIENTS_CONSTRUCTOR,
  CLEAR_BUN_CONSTRUCTOR,
  TIngredientsConstructorActions
} from '../actions/ingredients-constructor-actions';
import update from 'immutability-helper';
import { IIngredient } from "../../utils/types";
import { CustomCommands } from 'immutability-helper';

export type TIngredientsState = {
  ingredients: readonly IIngredient[];
  bun: IIngredient | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  bun: null,
}

export const ingredientsConstructorReducer = (state = initialState, action: TIngredientsConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [...state.ingredients, { ...action.ingredients, keyUuid: action.keyUuid }],
      };
    }
    case ADD_INGREDIENTS_BUN: {
      return {
        ...state,
        bun: action.bun
      };
    }
    case DELETE_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(item => item.keyUuid !== action.keyUuid)
      }
    }
    case MOVE_INGREDIENT_ITEM: {
      const updateIngredients = update<IIngredient[], CustomCommands<object>>([...state.ingredients], {
        $splice: [
          [[action.dragIndex], 1],
          [[action.hoverIndex], 0, [...state.ingredients][action.dragIndex]]
        ]
      })
      return {
        ...state,
        ingredients: updateIngredients
     }
    }
    case CLEAR_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: []
      }
    }
    case CLEAR_BUN_CONSTRUCTOR: {
      return {
        ...state,
        bun: null
      }
    }
    default: {
      return state;
    }
  }
};