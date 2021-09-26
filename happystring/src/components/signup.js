import { makeStyles } from "@material-ui/core/styles";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import {
  Button,
  TextField,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Box,
  Checkbox,
} from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import OauthButton from "./oauthButton";
import { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    paperbg: {
      marginTop: theme.spacing(5),
      display: "flex",
      backgroundColor: "#1E1E1E",
      padding: theme.spacing(5),
      borderRadius: "37px",
      flexDirection: "column",
      alignItems: "center",
      height: "70vh",
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "60%",
    },
    form: {
      height: "100%",
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "512px",
    },
    submit: {
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
    btn: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.action.selected,
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      // borderRadius: '20px',
    },
    cssLabel: {
      color: "white",
    },
    container: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    remember: {
      margin: theme.spacing(1, 0, 0),
    },
    textField: {
      color: theme.palette.action.hover,
      borderColor: theme.palette.action.hover,
      margin: theme.spacing(1),
    },
  };
});

function EmailInputSignup(params) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  function formHandle(event) {
    event.preventDefault();
    if (isEmail(email)) {
      params.fun(1);
      const state = { ...params.state };
      state.email = email;
      params.update(state);
    } else {
      alert("Invalid Email");
    }
  }
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        style={{ fontSize: "25px", fontWeight: "bold" }}
      >
        Sign Up
      </Typography>
      <OauthButton />
      <form className={classes.form} onSubmit={formHandle}>
        <TextField
          variant="outlined"
          value={params.state.email === "" ? email : params.state.email}
          onChange={(event) => {
            if (params.state.email !== "") {
              const state = { ...params.state };
              state.email = "";
              params.update(state);
            }
            setEmail(event.target.value);
          }}
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          className={classes.textField}
        />
        <Typography
          style={{ color: "gray", fontSize: "0.75em", margin: "5px" }}
        >
          * Sign Up Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus at dictum purus. Sed finibus mollis augue, ut congue est
          consequat rhoncus. Nullam eget ultrices velit.
        </Typography>
        <Button
          style={{ marginTop: "10%" }}
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
}
function PasswordSignup(params) {
  const classes = useStyles();
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setEror] = useState({ error: false, message: "" });
  function formHandle(event) {
    event.preventDefault();
    if (pass === cPass) {
      params.fun(2);
      const state = { ...params.state };
      state.password = pass;
      state.password2 = cPass;
      params.update(state);
    } else {
      setEror({ error: true, message: "The passwords are not equal" });
    }
  }
  return (
    <>
      <form className={classes.form} onSubmit={formHandle}>
        <div className={classes.paper}>
          <TextField
            error={error.error}
            helperText={error.message}
            className={classes.textField}
            variant="outlined"
            required
            fullWidth
            value={params.state.password === "" ? pass : params.state.password}
            onChange={(event) => {
              if (params.state.password !== "") {
                const state = { ...params.state };
                state.password = "";
                params.update(state);
              }
              setEror({ error: false, message: "" });
              setPass(event.target.value);
            }}
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            error={error.error}
            helperText={error.message}
            className={classes.textField}
            variant="outlined"
            required
            value={
              params.state.password2 === "" ? cPass : params.state.password2
            }
            onChange={(event) => {
              if (params.state.password2 !== "") {
                const state = { ...params.state };
                state.password2 = "";
                params.update(state);
              }
              setEror({ error: false, message: "" });
              setCPass(event.target.value);
            }}
            fullWidth
            id="password2"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
          />
          <Typography style={{ color: "gray", fontSize: "0.75em" }}>
            * Sign Up Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus at dictum purus. Sed finibus mollis augue, ut congue est
            consequat rhoncus. Nullam eget ultrices velit.
          </Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="100%"
            marginTop="10%"
          >
            <IconButton
              aria-label="back"
              style={{ width: "50px", height: "50px" }}
              onClick={() => params.fun(0)}
            >
              <ChevronLeft />
            </IconButton>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              className={"submit " + classes.submit}
            >
              Continue
            </Button>
          </Box>
        </div>
      </form>
    </>
  );
}
function UserInfoSignup(params) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(12);
  return (
    <>
      <form
        className={classes.form}
        onSubmit={(event) => event.preventDefault()}
      >
        <TextField
          className={classes.textField}
          id="username"
          fullWidth
          required
          variant="outlined"
          label="Userame"
          value={
            params.state.username === "" ? username : params.state.username
          }
          onChange={(event) => {
            if (params.state.password !== "") {
              const state = { ...params.state };
              state.username = "";
              params.update(state);
            }
            setUsername(event.target.value);
          }}
        />
        <TextField
          className={classes.textField}
          id="phone"
          required
          fullWidth
          variant="outlined"
          label="Phone Number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91 </InputAdornment>
            ),
          }}
          value={params.state.phone === "" ? phone : params.state.phone}
          onChange={(event) => {
            if (params.state.phone !== "") {
              const state = { ...params.state };
              state.phone = "";
              params.update(state);
            }
            if (
              isNaN(
                parseInt(
                  event.target.value.slice(event.target.value.length - 1),
                ),
              ) ||
              phone.length > 9
            ) {
              setPhone(event.target.value.slice(0, phone.length));
              return;
            }
            setPhone(event.target.value);
          }}
        />
        <TextField
          className={classes.textField}
          id="age"
          required
          fullWidth
          variant="outlined"
          label="Age"
          type="number"
          value={age}
          onChange={(event) => {
            setAge(parseInt(event.target.value));
          }}
        />
        <FormControlLabel
          className={classes.remember}
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Container className={classes.container}>
          <IconButton aria-label="back" onClick={() => params.fun(1)}>
            <ChevronLeft />
          </IconButton>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            className={"submit " + classes.submit}
            // onClick={() => params.fun()}
          >
            Save
          </Button>
        </Container>
      </form>
    </>
  );
}
export default function Signup() {
  const classes = useStyles();
  const [value, setValue] = useState({
    email: "",
    password: "",
    password2: "",
    phone: "",
    username: "",
    age: 0,
  });
  const [step, setStep] = useState(0);
  return (
    <Box
      component="main"
      maxWidth="xs"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <div className={classes.paperbg}>
        {step === 0 ? (
          <EmailInputSignup state={value} update={setValue} fun={setStep} />
        ) : step === 1 ? (
          <PasswordSignup state={value} update={setValue} fun={setStep} />
        ) : (
          <UserInfoSignup state={value} update={setValue} fun={setStep} />
        )}
      </div>
    </Box>
  );
}
