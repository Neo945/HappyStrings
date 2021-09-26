import { React } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "./static/Union.png";

const useStyles = makeStyles((theme) => {
  return {
    drawerList: {
      width: "260px",
    },
    title: {
      flexGrow: 1,
      fontFamily: "'Dancing Script', cursive",
      fontWeight: "bold",
      marginLeft: "25px",
    },
    navbar: {
      backgroundColor: "#1F1F1F",
    },
  };
});

function Navbar(params) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          <img
            src={logo}
            alt=""
            style={{
              height: "65px",
              margin: "15px",
            }}
          />
        </Typography>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">
            {window.location.pathname === "/login"
              ? "Register"
              : window.location.pathname === "/signup"
              ? "Login"
              : "Logout"}
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
