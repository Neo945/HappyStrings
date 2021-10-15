import "./App.css";
// eslint-disable-next-line
import {
  Login,
  Signup,
  Navbar,
  HomePage,
  Checkout,
  Payment,
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
import DetailsPage from "./DetailsPage";
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
//     lookup("GET", null, "/user/get")
//       .then((data) => {
//         if (data[0].user) {
//           localStorage.setItem("user", JSON.stringify(data[0].user));
//           setUser(data[0].user);
//         } else {
//           localStorage.setItem("user", null);
//           setUser(null);
//         }
//       });
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Route path="/search">
            <SearchPage />
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
