import { useState } from "react";
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
import getSearch from "./getSearch";
import lookup from "./fetchData/lookup";

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
      overflow: "hidden",
      borderRadius: "5px",
      width: "100%",
      marginRight: "50px",
    },
    textFeild: {
      "&::placeholder": {
        color: "#313131 !important",
      },
      color: "#ffffff",
    },
    img: {
      width: "40px",
      height: "60px",
      background: `url("https://picsum.photos/200/300") no-repeat center center`,
      backgroundSize: "cover",
    },
  };
});

function Logout() {
  return (
    <Button
      color="inherit"
      onClick={async (e) => {
        if ((await lookup("GET", null, "/auth/logout"))[1] === 200) {
          localStorage.setItem("user", null);
          window.location.href = "/";
        }
      }}
    >
      LOGOUT
    </Button>
  );
}

function Navbar(params) {
  const classes = useStyles();
  const [search, setSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
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
        <Box width="25%" height="35px">
          <Paper
            onSubmit={(e) => {
              e.preventDefault();
            }}
            component="form"
            className={classes.textFeildPaper}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              height="35px"
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                value={searchText}
                inputProps={{
                  "aria-label": "Search",
                  className: classes.textFeild,
                }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setSearch(
                    getSearch(e.target.value, classes.img, setSearchText),
                  );
                }}
                onFocus={(e) => {
                  e.preventDefault();
                  e.target.parentNode.parentNode.parentNode.style.height =
                    "fit-content";
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  e.target.parentNode.parentNode.parentNode.style.height =
                    "35px";
                  setSearch([]);
                }}
              />
              <SearchIcon style={{ fill: "#313131" }} />
            </Box>
            <div>{search}</div>
          </Paper>
        </Box>
        <Box
          width="40%"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Support</Button>
          </Link>
          {JSON.parse(localStorage.getItem("user")) === null ? (
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Button color="inherit">Signup</Button>
            </Link>
          ) : null}
          {JSON.parse(localStorage.getItem("user")) === null ? (
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Button color="inherit">Login</Button>
            </Link>
          ) : null}
          {JSON.parse(localStorage.getItem("user")) !== null ? (
            <Logout />
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
