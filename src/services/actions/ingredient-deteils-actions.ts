import {IIngredient} from '../../utils/types'

export const TAB_INGREDIENT: 'TAB_INGREDIENT' = 'TAB_INGREDIENT';
export const TAB_INGREDIENT_DELETE: 'TAB_INGREDIENT_DELETE' = 'TAB_INGREDIENT_DELETE';
export const MODAL_INGREDIENT_DETAILS_OPEN: 'MODAL_INGREDIENT_DETAILS_OPEN' = 'MODAL_INGREDIENT_DETAILS_OPEN';
export const MODAL_INGREDIENT_DETAILS_CLOSE: 'MODAL_INGREDIENT_DETAILS_CLOSE' = 'MODAL_INGREDIENT_DETAILS_CLOSE';

export interface ITabIngredientAction {
    readonly type: typeof TAB_INGREDIENT;
    readonly tabIngredient: IIngredient;
  }
  
  export interface ITabIngredientDeleteAction {
    readonly type: typeof TAB_INGREDIENT_DELETE;
  }
  
  export interface IModalIngredientDetailsOpenAction {
    readonly type: typeof MODAL_INGREDIENT_DETAILS_OPEN;
  }

  export interface IModalIngredientDetailsCloseAction {
    readonly type: typeof MODAL_INGREDIENT_DETAILS_CLOSE;
  }

  
  export type TIngredientDetailsActions =
    | ITabIngredientAction
    | ITabIngredientDeleteAction
    | IModalIngredientDetailsOpenAction
    | IModalIngredientDetailsCloseAction;


export function openModalIngredientDetails(): IModalIngredientDetailsOpenAction{
    return {
      type: MODAL_INGREDIENT_DETAILS_OPEN
    }
  }
  
  export function returnTabIngredient(item: IIngredient): ITabIngredientAction {
    return {
      type: TAB_INGREDIENT, tabIngredient: item
    }
  }
  
  export function closeModalIngredientDetails(): IModalIngredientDetailsCloseAction {
    return {
      type: MODAL_INGREDIENT_DETAILS_CLOSE
    }
  }
  
  export function deleteTabIngredient(): ITabIngredientDeleteAction {
    return {
      type: TAB_INGREDIENT_DELETE
    }
  }