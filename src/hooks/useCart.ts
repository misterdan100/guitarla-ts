import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db.ts";
import type { Guitar, CartItem, GuitarID } from "../types/index.ts";

const useCart = () => {
  
  
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('guitarCart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5

  useEffect(() => {
    localStorage.setItem('guitarCart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item: Guitar) {
    const itemExists = cart.findIndex((product) => product.id === item.id)

    if(itemExists >= 0) {
      const updatedCart: any = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)

    } else {
      const newItem: CartItem = {...item, quantity: 1}
      setCart(prevState => [...prevState, newItem])
    }
  }

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

  const cartTotal = useMemo(() => cart.reduce((total, current) => total + (current.quantity ? current.quantity * current.price: 0),0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
    cartTotal
  }

}

export default useCart