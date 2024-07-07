import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

// 1. Create actions type
export type CartActions =
    { type: 'add-to-cart', payload: {item: Guitar} } |
    { type: 'remove-from-cart', payload: {id: Guitar['id']}} |
    { type: 'decrease-quantity', payload: {id: Guitar['id']}} |
    { type: 'increase-quantity', payload: {id: Guitar['id']}} |
    { type: 'clear-cart'}

// 2. Create states type
export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

// 2.1 Create Initial state
export const initialState : CartState = {
    data: db,
    cart: []
}

const MAX_ITEMS = 5

// 3. Create reducer function
export const cartReducer = (
        state: CartState = initialState,
        actions: CartActions
    ) => {

    if (actions.type === "add-to-cart") {
      const itemExists = state.cart.find(
        (product) => product.id === actions.payload.item.id
      );

      let updatedCart: CartItem[] = [];

      if (itemExists) {
        updatedCart = state.cart.map((item) => {
          if (item.id === actions.payload.item.id) {
            if (item.quantity < MAX_ITEMS) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          } else {
            return item
          }
        });
      } else {
        const newItem: CartItem = { ...actions.payload.item, quantity: 1 };
        updatedCart = [...state.cart, newItem];
      }
      return {
        ...state,
        cart: updatedCart,
      };
    }

    if(actions.type === 'remove-from-cart') {


        return {
            ...state,

        }
    }

    if(actions.type === 'decrease-quantity') {


        return {
            ...state,

        }
    }

    if(actions.type === 'increase-quantity') {


        return {
            ...state,

        }
    }

    if(actions.type === 'clear-cart') {


        return {
            ...state,

        }
    }

    return state
}