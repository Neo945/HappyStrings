import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import OauthButton from "./oauthButton";
// import { lookup } from "./fetchData/lookup";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      marginTop: theme.spacing(5),
      display: "flex",
      padding: theme.spacing(5),
      backgroundColor: "#1E1E1E",
      borderRadius: "37px",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "512px",
      // marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      height: "50px",
      width: "207px",
      borderRadius: "50px",
      fontSize: "20px",
      color: "#ffffff",
      backgroundColor: theme.palette.action.selected,
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    remember: {
      margin: theme.spacing(1, 0, 0),
      fontSize: "20px",
    },
    text: {
      margin: theme.spacing(2),
      color: theme.palette.text.primary,
      width: "500px",
      height: "43px",
      "&:active": {
        color: theme.palette.text.secondary,
      },
    },
  };
});

export default function Login() {
  function formHandle(event) {
    event.preventDefault();
    let data = {};
    const formdata = new FormData(event.target);
    formdata.forEach((e, v) => {
      data[v] = e;
    });
    // lookup("POST", data, "/api/auth/user/login");
  }
  const classes = useStyles();
  return (
    <Box
      component="main"
      maxWidth="xs"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          style={{ fontSize: "25px", fontWeight: "bold" }}
        >
          Please log in to continue,
        </Typography>
        <OauthButton />
        <form className={classes.form} onSubmit={formHandle}>
          <TextField
            className={classes.text}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          <TextField
            className={classes.text}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid
            item
            xs
            style={{
              marginTop: "40px 0 10px 0",
              transform: "translateX(23px)",
            }}
          >
            <Link
              href="#"
              variant="body2"
              style={{ fontSize: "20px", color: "#6F6F6F" }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Box
            display="flex"
            minWidth="500px"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              className={classes.remember}
              control={
                <Checkbox value="remember" style={{ color: "#8F8F8F" }} />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
          </Box>

          <Grid container></Grid>
        </form>
        <div
          style={{
            width: "500px",
            height: "1px",
            backgroundColor: "#757575",
            margin: "20px 0 20px 0",
          }}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ fontSize: "25px", fontWeight: "bold" }}
          >
            Don't have an account?,
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </Box>
      </div>
    </Box>
  );
}
