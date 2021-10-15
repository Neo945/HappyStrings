import "./App.css";
// eslint-disable-next-line
import {
  Login,
  Signup,
  Navbar,
  HomePage,
  Checkout,
  OrderPage,
  // Cart,
  CartV2,
  SearchPage,
} from "./components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import lookup from "./components/fetchData/lookup";

function addToCart(setCart, book) {
  lookup("POST", { book }, "/user/add/cart").then((data) => {
    setCart(data[0].cart);
  });
}
function removeFromCart(setCart, book) {
  lookup("POST", { book }, "/user/remove/cart").then((data) => {
    setCart(data[0].cart);
  });
}

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
    if (user === null) {
      lookup("GET", null, "/user/get").then((data) => {
        if (data[0].user) {
          localStorage.setItem("user", JSON.stringify(data[0].user));
          setUser(data[0].user);
        } else {
          localStorage.setItem("user", null);
          setUser(null);
        }
      });
      lookup("GET", null, "/user/cart").then((data) => {
        setCart(data[0].cart);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Router>
        <Navbar />
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
              />
            ) : (
              //<Redirect to="/login" />
              <CartV2
                cart={cart}
                add={addToCart}
                setCart={setCart}
                remove={removeFromCart}
              />
            )}
          </Route>
          <Route path="/search">
            <SearchPage add={addToCart} setCart={setCart} />
          </Route>
          <Route path="/order">
            <OrderPage />
          </Route>

          <Route path = "/test">
            <DetailsPage />
          </Route>

          <Route path="/">
            <HomePage />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
