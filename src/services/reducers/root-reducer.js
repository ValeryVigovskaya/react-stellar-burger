import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-Ingredients-reducer';
import { ingredientDetailsReducer } from './ingredient-details-reducer';
import { ingredientsConstructorReducer } from './ingredients-constructor-reducer';
import { orderDetailsReducer } from './order-details-reducer';
import { userReducer } from './user-reducer';
import { ordersReducer } from './reducer-ws';
import {orderModalReducer} from './order-reducer'
import {getOrdersReducer} from './get-order-reducer'
import { ordersInProfileReducer } from './reducer-ws-in-profile';


export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredientsConstructor: ingredientsConstructorReducer,
    orderDetails: orderDetailsReducer,
    userReducer: userReducer,
    ordersReducer: ordersReducer,
    getOrders: getOrdersReducer,
    orderModal: orderModalReducer,
    ordersInProfileReducer: ordersInProfileReducer
})