import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./OrderPage.css";
import { Box, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    height: "24vh",
    width: "70vw",
    borderRadius: "15px",
    marginTop: "5vh",
    color: "white",
  },
}));

function OrderPage() {
  const classes = useStyles();

  return (
    <>
      <Box height="7vh" />
      <Box width="100vw" height="93vh" style={{ overflowY: "scroll" }}>
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Paper key={item} className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <img
                  className="book-img"
                  src="https://images-na.ssl-images-amazon.com/images/I/51CPNIRSWeL._SX339_BO1,204,203,200_.jpg"
                  alt=""
                />
              </Grid>
              <Grid item xs={3}>
                <div className="book-name">
                  <h3>Atomic Habits</h3>
                  <h4>James Clear</h4>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="book-price">
                  <h3>Price</h3>
                  <h4>400</h4>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="status">
                  <h4>Status</h4>
                  <p>Delivered</p>
                </div>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </>
  );
}

export default OrderPage;
