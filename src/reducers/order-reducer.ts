import { MenuItem, OrderItem } from "../types";

// Types
export type OrderActions =
  | { type: "add-item"; payload: { item: MenuItem } }
  | { type: "remove-item"; payload: { id: MenuItem["id"] } }
  | { type: "place-order" }
  | { type: "add-tip"; payload: { value: number } };

export type OrderState = {
  order: OrderItem[];
  tip: number;
};

// Initial state
export const initialState: OrderState = {
  order: [],
  tip: 0,
};

// Reducer
export const orderReducer = (
  state: OrderState = initialState,
  action: OrderActions
) => {
  // Actions
  if (action.type === "add-item") {
    const itemExists = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );
    let order: OrderItem[] = [];
    if (itemExists) {
      order = state.order.map((orderItem) =>
        orderItem.id === action.payload.item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
      order = [...state.order, newItem];
    }
    return { ...state, order };
  }
  if (action.type === "remove-item") {
    const updatedOrder = state.order.filter(
      (item) => item.id !== action.payload.id
    );
    return { ...state, order: updatedOrder };
  }
  if (action.type === "place-order") {
    return initialState;
  }
  if (action.type === "add-tip") {
    const tip = action.payload.value;
    return { ...state, tip };
  }
  // reducer always must return state
  return state;
};
