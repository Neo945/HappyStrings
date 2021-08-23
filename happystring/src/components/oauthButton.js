import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles((theme) => {
  return {
    icon: {
      display: "flex",
      width: "inherit",
      height: "inherit",
    },
    googleButton: {
      margin: theme.spacing(2, 0, 0, 0),
      backgroundColor: "#191919",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      height: "64px",
      width: "500px",
      borderRadius: "64px",
      fontSize: "25px",
      color: "#ffffff",
    },
    buttonForm: {
      margin: theme.spacing(0, 0, 2, 0),
    },
    divider: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
  };
});

export default function OauthButton(params) {
  const classes = useStyles();
  return (
    <>
      <form className={classes.form + " " + classes.buttonForm}>
        <Button
          // onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
          variant="contained"
          // color="primary"
          fullWidth
          className={classes.googleButton}
          startIcon={
            <Icon>
              <img
                className={classes.icon}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/600px-Google_%22G%22_Logo.svg.png"
                alt=""
              />
            </Icon>
          }
        >
          Login with Google
        </Button>
        <br />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.googleButton}
          startIcon={<FacebookIcon />}
        ></Button>
      </form>
      <div className={"seperator " + classes.divider}>
        <div
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          OR
        </div>
      </div>
    </>
  );
}
