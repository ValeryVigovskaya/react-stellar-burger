import { IIngredient } from "../../utils/types";
import { v4 as uuidv4 } from "uuid";

export const ADD_INGREDIENTS_CONSTRUCTOR: "ADD_INGREDIENTS_CONSTRUCTOR" =
  "ADD_INGREDIENTS_CONSTRUCTOR";
export const ADD_INGREDIENTS_BUN: "ADD_INGREDIENTS_BUN" = "ADD_INGREDIENTS_BUN";
export const DELETE_INGREDIENTS_CONSTRUCTOR: "DELETE_INGREDIENTS_CONSTRUCTOR" =
  "DELETE_INGREDIENTS_CONSTRUCTOR";
export const CLEAR_INGREDIENTS_CONSTRUCTOR: "CLEAR_INGREDIENTS_CONSTRUCTOR" =
  "CLEAR_INGREDIENTS_CONSTRUCTOR";
export const CLEAR_BUN_CONSTRUCTOR: "CLEAR_BUN_CONSTRUCTOR" =
  "CLEAR_BUN_CONSTRUCTOR";
export const MOVE_INGREDIENT_ITEM: "MOVE_INGREDIENT_ITEM" =
  "MOVE_INGREDIENT_ITEM";

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENTS_CONSTRUCTOR;
  readonly ingredients: IIngredient;
  readonly keyUuid: string;
}

export interface IAddIngredientsBunAction {
  readonly type: typeof ADD_INGREDIENTS_BUN;
  readonly bun: IIngredient;
}

export interface IClearIngredientsAction {
  readonly type: typeof CLEAR_INGREDIENTS_CONSTRUCTOR;
}

export interface IClearBunAction {
  readonly type: typeof CLEAR_BUN_CONSTRUCTOR;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENTS_CONSTRUCTOR,
    readonly keyUuid: IIngredient['keyUuid'],
};

export type TIngredientsConstructorActions =
  | IAddIngredientAction
  | IAddIngredientsBunAction
  | IClearIngredientsAction
  | IClearBunAction
  | IMoveIngredientAction
  | IDeleteIngredientAction;

export function addIngredientsBun(item: IIngredient): IAddIngredientsBunAction {
  return {
    type: ADD_INGREDIENTS_BUN,
    bun: item,
  };
}

export function addIngredients(item: IIngredient): IAddIngredientAction {
  return {
    type: ADD_INGREDIENTS_CONSTRUCTOR,
    ingredients: item,
    keyUuid: uuidv4(),
  };
}

export function onDelete (keyUuid: IIngredient['keyUuid']): IDeleteIngredientAction {
  return ({
    type: DELETE_INGREDIENTS_CONSTRUCTOR,
    keyUuid: keyUuid,
  });
};

export function clearConstructorIngredients(): IClearIngredientsAction {
  return {
    type: CLEAR_INGREDIENTS_CONSTRUCTOR,
  };
}

export function clearConstructorBun(): IClearBunAction {
  return {
    type: CLEAR_BUN_CONSTRUCTOR,
  };
}

export function moveIngredientItem(
  dragIndex: number,
  hoverIndex: number
): IMoveIngredientAction {
  return {
    type: MOVE_INGREDIENT_ITEM,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
}
