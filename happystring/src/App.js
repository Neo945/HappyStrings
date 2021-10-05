import "./App.css";
// eslint-disable-next-line
import {
  Login,
  Signup,
  Navbar,
  HomePage,
  Checkout,
  Payment,
  // Cart,
  CartV2,
} from "./components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import OrderPage from "./OrderPage";
import SearchPage from "./SearchPage"

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
  // useEffect(() => {
  //   if (user === null) {
  //     fetch("/api/user/get", {
  //       method: "GET",
  //       credentials: "include",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.user) {
  //           localStorage.setItem("user", JSON.stringify(data));
  //           setUser(data);
  //         } else {
  //           localStorage.setItem("user", null);
  //           setUser(null);
  //         }
  //       });
  //   }
  // }, []);
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
            {user ? <Checkout /> : <Redirect to="/login" />}
          </Route>
          <Route path="/payment">
            {user ? <Payment /> : <Redirect to="/login" />}
          </Route>
          <Route path="/cart">
            {user ? <CartV2 /> : <Redirect to="/login" />}
          </Route>
          <Route path="/test">
            <SearchPage/>
          </Route>
          <Route path="/">
            {user ? <HomePage /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
