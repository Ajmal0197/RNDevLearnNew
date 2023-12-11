export const ORDER_CAKE = 'ORDER_CAKE';
export const RESTOCK_CAKE = 'RESTOCK_CAKE';

export const orderCake = () => ({ type: ORDER_CAKE });

export const restockCake = (qty) => ({ type: RESTOCK_CAKE, payload: qty });
