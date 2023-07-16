import {
  ADD_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_BUN,
  DELETE_INGREDIENTS_CONSTRUCTOR,
  MOVE_INGREDIENT_ITEM,
  CLEAR_INGREDIENTS_CONSTRUCTOR,
  CLEAR_BUN_CONSTRUCTOR
} from '../actions/actions'
import update from 'immutability-helper'

const initialState = {
  ingredients: [],
  bun: null,
}

export const ingredientsConstructorReducer = (state = initialState, action) => {
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
      const updateIngredients = update([...state.ingredients], {
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