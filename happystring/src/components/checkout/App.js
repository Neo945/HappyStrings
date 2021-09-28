import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { inputFormElements } from "./checkoutElements";
import EditIcon from "@material-ui/icons/Edit";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const useStyles = makeStyles((theme) => ({
  btn: {
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

export default function Checkout() {
  const margin = { margin: "0 6px" };
  const classes = useStyles();
  return (
    <div className="App">
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Card
          style={{
            maxWidth: 450,
            margin: "0 auto",
            padding: "20px 5px",
            borderRadius: "37px",
            backgroundColor: "#1E1E1E",
            // height: "70vh",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h3" align="center">
              Checkout
            </Typography>
            <form>
              <Grid container spacing={2}>
                {inputFormElements.map((input, i) => (
                  <Grid key={i} xs={input.xs} sm={input.sm} item>
                    <TextField {...input} />
                  </Grid>
                ))}

                <Box
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    startIcon={<EditIcon />}
                    endIcon={<AddShoppingCartIcon />}
                    style={margin}
                    className={classes.btn}
                    type="submit"
                    variant="contained"
                  >
                    Edit Cart
                  </Button>
                  <Button
                    type="submit"
                    className={classes.btn}
                    variant="contained"
                  >
                    Pay Now
                  </Button>
                </Box>
              </Grid>
            </form>
            <br />
            <Typography
              align="center"
              variant="subtitle1"
              color="textSecondary"
            >
              Delivery will be done on the above mentioned address
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
