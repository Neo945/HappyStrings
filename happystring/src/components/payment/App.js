import Button from "@material-ui/core/Button";
import PaymentIcon from "@material-ui/icons/Payment";
import TextField from "@material-ui/core/TextField";
import { Typography, Card, CardContent, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { inputFormElements } from "./paymentElements";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
}));

export default function Payment() {
  const classes = useStyles();
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        style={{
          maxWidth: 450,
          margin: "0 auto",
          padding: "20px 5px",
          backgroundColor: "#1E1E1E",
          borderRadius: "37px",
          height: "70vh",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography gutterbottom variant="h5">
            Make a Payment
          </Typography>
          <form>
            <Grid container spacing={1}>
              {inputFormElements.map((input) => (
                <Grid xs={input.xs} sm={input.sm} item>
                  <TextField {...input} />
                </Grid>
              ))}

              <Grid xs={12} item align="center">
                <br />
                <Button
                  startIcon={<PaymentIcon />}
                  size="small"
                  className={classes.submit}
                  style={{
                    width: "100%",
                  }}
                  onClick={() => alert("ARE YOU SURE YOU WANT TO PROCEED?")}
                  variant="contained"
                >
                  Finish and Pay
                </Button>
              </Grid>
            </Grid>
          </form>
          <br />
          <Typography align="center" variant="subtitle1" color="textSecondary">
            Payment Confirmation will be sent through your Email. Thank You!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
