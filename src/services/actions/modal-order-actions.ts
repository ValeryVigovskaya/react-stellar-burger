export const MODAL_ORDER_OPEN: 'MODAL_ORDER_OPEN' = 'MODAL_ORDER_OPEN';
export const MODAL_ORDER_CLOSE: 'MODAL_ORDER_CLOSE' = 'MODAL_ORDER_CLOSE';

export interface IModalOrderOpenAction {
    readonly type: typeof MODAL_ORDER_OPEN;
  }
  
  export interface IModalOrderCloseAction {
    readonly type: typeof MODAL_ORDER_CLOSE;
  }

  export type TModalOrderActions =
    | IModalOrderOpenAction
    | IModalOrderCloseAction;


export function openModalOrder(): IModalOrderOpenAction {
    return {
      type: MODAL_ORDER_OPEN
    }
  }
  
  export function closeModalOrder(): IModalOrderCloseAction {
    return {
      type: MODAL_ORDER_CLOSE
    }
  }