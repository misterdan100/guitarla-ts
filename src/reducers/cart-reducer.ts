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
        const updatedCart = state.cart.filter( guitar => guitar.id !== actions.payload.id)

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(actions.type === 'decrease-quantity') {
        const updatedCart = state.cart.map( item => {
            if(item.id === actions.payload.id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            } else {
                return item
            }
        })

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(actions.type === 'increase-quantity') {

        const updatedCart = state.cart.map( item => {
            if(item.id === actions.payload.id && item.quantity < MAX_ITEMS) {
                // this way to avoid duplicate quantity
                return {...item, quantity: item.quantity + 1}
            } else {
                return item
            }
        })

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(actions.type === 'clear-cart') {


        return {
            ...state,
            cart: []
        }
    }

    return state
}