import { useEffect, useState, useMemo } from "react";
import type { CartItem, GuitarID } from "../types/index.ts";

const useCart = () => {
  
  
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('guitarCart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5

  useEffect(() => {
    localStorage.setItem('guitarCart', JSON.stringify(cart))
  }, [cart])

  function removeFromCart(id: GuitarID) {
    // const updatedCart = cart.filter( item => id !== item.id)
    // setCart(updatedCart)

    setCart( prevCart => prevCart.filter( item => item.id !== id))
  }

  function increaseQuantity(id: GuitarID) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        item.quantity++
        return item
      }
      return item
    })

    setCart(updatedCart)
  }

  function decreaseQuantity(id: GuitarID) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > 1) {
        item.quantity--
        return item
      }
      return item
    })

    setCart(updatedCart)
  }

  function cleanCart() {
    setCart([])
  }



  return {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
  }

}

export default useCart