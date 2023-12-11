export const ORDER_ICECREAM = 'ORDER_ICECREAM';
export const RESTOCK_ICECREAM = 'RESTOCK_ICECREAM';

export const orderIcecream = () => ({ type: ORDER_ICECREAM });

export const restockIcecream = (qty) => ({ type: RESTOCK_ICECREAM, payload: qty });
