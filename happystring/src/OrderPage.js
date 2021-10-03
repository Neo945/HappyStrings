import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./OrderPage.css";
import { Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    height: "24vh",
    width: "70vw",
    backgroundColor: "white",
    borderRadius: "15px",
    marginTop: "5vh",
    color: "black",
  },
}));

function OrderPage() {
  const classes = useStyles();

  return (
    <>
      <Box height="15vh" />

      <div className={classes.root}>
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
      </div>

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <img
              className="book-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST_mF1cX6dgVAve69wqbU0aUb3eWywV52CAJme19Pq-z6Q25cNXTklWCKU_jKZ1lVo2o8&usqp=CAU"
              alt=""
            />
          </Grid>
          <Grid item xs={3}>
            <div className="book-name">
              <h3>Book name</h3>
              <h4>Author</h4>
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
      </div>

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <img
              className="book-img"
              src="https://img.theculturetrip.com/450x/smart/wp-content/uploads/2017/08/white-tiger-arvind-adiga-harpercollins.jpg"
              alt=""
            />
          </Grid>
          <Grid item xs={3}>
            <div className="book-name">
              <h3>Book name</h3>
              <h4>Author</h4>
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
      </div>

      <div className={classes.root}>
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
              <h3>Book name</h3>
              <h4>Author</h4>
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
      </div>

      <div className={classes.root}>
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
              <h3>Book name</h3>
              <h4>Author</h4>
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
      </div>
    </>
  );
}

export default OrderPage;
