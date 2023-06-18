import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-Ingredients-reducer';
import { ingredientDetailsReducer } from './ingredient-details-reducer'
import { ingredientsConstructorReducer } from './ingredients-constructor-reducer'
import { orderDetailsReducer } from './order-details-reducer'

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredientsConstructor: ingredientsConstructorReducer,
    orderDetails: orderDetailsReducer
})