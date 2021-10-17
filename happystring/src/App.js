import "./App.css";
// eslint-disable-next-line
import {
  Login,
  Signup,
  Navbar,
  HomePage,
  Checkout,
  OrderPage,
  CartV2,
  SearchPage,
} from "./components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import OrderPage from "./OrderPage";
import SearchPage from "./SearchPage";
import DetailsPage from "./DetailsPage";
import SuccessPage from "./SuccessPage";
import OrderDetailsPage from "./OrderDetailsPage";
=======
import lookup from "./components/fetchData/lookup";

function addToCart(setCart, book) {
  lookup("POST", book, "/auth/add/cart").then((data) => {
    setCart(data[0].cart);
  });
}
function removeFromCart(setCart, book) {
  lookup("POST", book, "/auth/remove/cart").then((data) => {
    setCart(data[0].cart);
  });
}
function removeAllFromCart(setCart, book) {
  lookup("POST", book, "/auth/remove/all/cart").then((data) => {
    setCart(data[0].cart);
  });
}

function addToPurchase(books) {
  localStorage.setItem("purchase", JSON.stringify(books));
}
>>>>>>> 0604cf59d5ed8be242c82cec838d71305bd974ce

function App() {
  makeStyles((theme) => ({
    "@global": {
      "#root": {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#121212",
        color: theme.palette.text.primary,
      },
    },
  }))();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (window.location.pathname !== "/checkout")
      localStorage.removeItem("purchase");
    if (user === null) {
      lookup("GET", null, "/auth/get").then((data) => {
        if (data[0].user) {
          localStorage.setItem("user", JSON.stringify(data[0].user));
          setUser(data[0].user);
        } else {
          localStorage.setItem("user", null);
          setUser(null);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    lookup("GET", null, "/auth/cart").then((data) => {
      setCart(data[0].cart);
    });
  }, []);
  console.log(cart, user);
  return (
    <div>
      <Router>
        <Navbar totalItems={cart.length} />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/checkout">
            {user ? <Checkout /> : <Checkout to="/login" />}
          </Route>
          <Route path="/cart">
            {user ? (
              <CartV2
                cart={cart}
                add={addToCart}
                setCart={setCart}
                remove={removeFromCart}
                removeAll={removeAllFromCart}
                buyNow={addToPurchase}
              />
            ) : (
              //<Redirect to="/login" />
              <CartV2
                cart={cart}
                add={addToCart}
                setCart={setCart}
                remove={removeFromCart}
                removeAll={removeAllFromCart}
                buyNow={addToPurchase}
              />
            )}
          </Route>
          <Route path="/search">
            <SearchPage
              add={addToCart}
              setCart={setCart}
              buyNow={addToPurchase}
            />
          </Route>
<<<<<<< HEAD
          <Route path="/test">
            <OrderDetailsPage />
=======
          <Route path="/order">
            <OrderPage />
>>>>>>> 0604cf59d5ed8be242c82cec838d71305bd974ce
          </Route>

          {/* <Route path="/test">
            <DetailsPage />
          </Route> */}

          <Route path="/">
            <HomePage
              cart={cart}
              add={addToCart}
              setCart={setCart}
              remove={removeFromCart}
              buyNow={addToPurchase}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
