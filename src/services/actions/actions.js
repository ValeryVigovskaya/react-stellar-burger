import { getDataFetch, postOrder, getUser, login, postMail, postRegister, logOut } from '../../api/api'
export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const INGREDIENTS_CONSTRUCTOR_REQUEST = 'GET_INGREDIENTS_CONSTRUCTOR_REQUEST';
export const ADD_INGREDIENTS_CONSTRUCTOR = 'ADD_INGREDIENTS_CONSTRUCTOR';
export const ADD_INGREDIENTS_BUN = 'ADD_INGREDIENTS_BUN';
export const DELETE_INGREDIENTS_CONSTRUCTOR = 'DELETE_INGREDIENTS_CONSTRUCTOR';
export const CLEAR_INGREDIENTS_CONSTRUCTOR = 'CLEAR_INGREDIENTS_CONSTRUCTOR';
export const CLEAR_BUN_CONSTRUCTOR = 'CLEAR_BUN_CONSTRUCTOR';

export const TAB_INGREDIENT = 'TAB_INGREDIENT';
export const TAB_INGREDIENT_DELETE = 'TAB_INGREDIENT_DELETE';
export const MODAL_INGREDIENT_DETAILS_OPEN = 'MODAL_INGREDIENT_DETAILS_OPEN';
export const MODAL_INGREDIENT_DETAILS_CLOSE = 'MODAL_INGREDIENT_DETAILS_CLOSE';

export const TAB_ORDER = 'TAB_ORDER';
export const MODAL_ORDER_DETAILS_OPEN = 'MODAL_ORDER_DETAILS_OPEN';
export const MODAL_ORDER_DETAILS_CLOSE = 'MODAL_ORDER_DETAILS_CLOSE';

export const MOVE_INGREDIENT_ITEM = 'MOVE_INGREDIENT_ITEM';

// Наш первый thunk
export function getData() {
  // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
  return function (dispatch) {
    dispatch({
      type: GET_DATA_REQUEST
    })
    // Запрашиваем данные у сервера
    getDataFetch()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_DATA_SUCCESS,
            data: res.data,
          })
        } else {
          // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: GET_DATA_FAILED
          })
        }
      }).catch(err => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: GET_DATA_FAILED
        })
      })
  }
}

export function postOrderFetch(array) {
  // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    })
    // Запрашиваем данные у сервера
    postOrder(array)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            order: res,
          })
        } else {
          // Если произошла ошибка, отправляем соответствующий экшен
          dispatch({
            type: POST_ORDER_FAILED
          })
        }
      }).catch(err => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: POST_ORDER_FAILED
        })
      })
  }
}

export function openModalIngredientDetails() {
  return {
    type: MODAL_INGREDIENT_DETAILS_OPEN
  }
}

export function returnTabIngredient(item) {
  return {
    type: TAB_INGREDIENT, tabIngredient: item
  }
}

export function closeModalIngredientDetails() {
  return {
    type: MODAL_INGREDIENT_DETAILS_CLOSE
  }
}

export function deleteTabIngredient() {
  return {
    type: TAB_INGREDIENT_DELETE
  }
}

export function addIngredientsBun(item) {
  return {
    type: ADD_INGREDIENTS_BUN,
    bun: item,
  }
}

export function addIngredients(item, keyUuid) {
  return {
    type: ADD_INGREDIENTS_CONSTRUCTOR,
    ingredients: item,
    key: keyUuid
  }
}

export function openModalOrderDetails() {
  return {
    type: MODAL_ORDER_DETAILS_OPEN
  }
}

export function closeModalOrderDetails() {
  return {
    type: MODAL_ORDER_DETAILS_CLOSE
  }
}

export function clearConstructorIngredients() {
  return {
    type: MODAL_ORDER_DETAILS_CLOSE
  }
}

export function clearConstructorBun() {
  return {
    type: CLEAR_BUN_CONSTRUCTOR
  }
}

export function moveIngredientItem(dragIndex, hoverIndex) {
  return {
    type: MOVE_INGREDIENT_ITEM,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
  }
}