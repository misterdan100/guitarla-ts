import { useEffect, useState } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db.js";

function App() {

  const dataFromLS = JSON.parse(localStorage.getItem('guitarCart'))

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(() => dataFromLS.length ? dataFromLS : []);

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

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data?.map(guitar => <Guitar 
            key={guitar.id}
            guitar={guitar}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
          />)}
          
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
