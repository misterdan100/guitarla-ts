import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db.js";

const useCart = () => {
  
  
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('guitarCart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5

  useEffect(() => {
    localStorage.setItem('guitarCart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    const itemExists = cart.findIndex((product) => product.id === item.id)

    if(itemExists >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)

    } else {
      item.quantity = 1
      setCart(prevState => [...prevState, item])
    }
  }

  function removeFromCart(id) {
    // const updatedCart = cart.filter( item => id !== item.id)
    // setCart(updatedCart)

    setCart( prevCart => prevCart.filter( item => item.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        item.quantity++
        return item
      }
      return item
    })

    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
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

  const cartTotal = useMemo(() => cart.reduce((total, current) => total + (current.quantity * current.price),0), [cart])

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