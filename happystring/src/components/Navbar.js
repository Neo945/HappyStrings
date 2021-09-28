import { React } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "./static/Union.png";
import SearchIcon from "@material-ui/icons/Search";

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
    textFeildPaper: {
      padding: "0px 10px",
      backgroundColor: "#121212",
      height: "35px",
      display: "flex",
      alignItems: "center",
      borderRadius: "5px",
      justifyContent: "space-between",
      width: "25%",
      marginRight: "50px",
    },
    textFeild: {
      "&::placeholder": {
        color: "#313131 !important",
      },
      color: "#ffffff",
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
              height: "30px",
              width: "15px",
            }}
          />
        </Typography>
        <Paper
          component="form"
          className={classes.textFeildPaper}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{
              "aria-label": "Search",
              className: classes.textFeild,
            }}
          />
          {/* <IconButton type="submit" sx={{ p: "10px" }} aria-label="search"> */}
          <SearchIcon style={{ fill: "#313131" }} />
          {/* </IconButton> */}
        </Paper>

        <Box
          width="40%"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">
              {window.location.pathname === "/login"
                ? "Support"
                : window.location.pathname === "/signup" ||
                  window.location.pathname === "/"
                ? "Support"
                : "Support"}
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">
              {window.location.pathname === "/login"
                ? "Sign up"
                : window.location.pathname === "/signup" ||
                  window.location.pathname === "/"
                ? "Sign up"
                : "Sign up"}
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">
              {window.location.pathname === "/login"
                ? "Register"
                : window.location.pathname === "/signup" ||
                  window.location.pathname === "/"
                ? "Login"
                : "Logout"}
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
