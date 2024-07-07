import { useReducer } from "react";
import { cartReducer, initialState } from "./reducers/cart-reducer.ts";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import useCart from "./hooks/useCart.ts";


function App() {

  const [ state, dispatch ] = useReducer(cartReducer, initialState)

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
        cartTotal={cartTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data?.map(guitar => <Guitar 
            key={guitar.id}
            guitar={guitar}
            dispatch={dispatch}
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
