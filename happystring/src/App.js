import "./App.css";
// eslint-disable-next-line
import { Login, Signup, Navbar, HomePage } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

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
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
