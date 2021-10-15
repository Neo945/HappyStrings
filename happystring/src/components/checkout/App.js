import { useState, useEffect } from "react";
import { css } from "styled-components";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import BookModal from "../bookModal";
import lookup from "../fetchData/lookup";
import { styled } from "@material-ui/core";
import { inputFormElements } from "./checkoutElements";
import EditIcon from "@material-ui/icons/Edit";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

const useStyle = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "50px",
    width: "fit-content",
    padding: "0px 10px",
    borderRadius: "50px",
    fontSize: "1em",
    color: "#ffffff",
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  btn: {
    margin: theme.spacing(1, 0, 2),
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

const cardStyle = {
  fieldWrapper: {
    base: css`
      background-color: #424242;
      width: 100%;
    `,
  },
  inputWrapper: {
    base: css`
      background-color: #424242;
    `,
    errored: css`
      background-color: #424242;
    `,
  },
  input: {
    base: css`
      color: white;
    `,
    errored: css`
      color: red;
    `,
  },
  errorText: {
    base: css`
      color: red;
    `,
  },
};

function InputData() {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();
  const margin = { margin: "0 6px" };
  const classes = useStyle();
  return (
    <div style={{ padding: "10px" }}>
      <form>
        <Grid container spacing={2}>
          {inputFormElements.map((input, i) => (
            <Grid key={i} xs={input.xs} sm={input.sm} item>
              <TextField {...input} />
            </Grid>
          ))}
          <Grid xs={12} sm={12} item>
            <PaymentInputsWrapper {...wrapperProps} styles={cardStyle}>
              <svg
                style={{ backgroundColor: "#424242" }}
                {...getCardImageProps({ images })}
              />
              <input
                style={{
                  backgroundColor: "#424242",
                  width: "65%",
                  marginRight: "10%",
                }}
                {...getCardNumberProps()}
              />
              <input
                style={{ backgroundColor: "#424242" }}
                {...getExpiryDateProps()}
              />
              <input
                style={{ backgroundColor: "#424242" }}
                {...getCVCProps()}
              />
            </PaymentInputsWrapper>
          </Grid>

          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Button
              startIcon={<EditIcon />}
              endIcon={<AddShoppingCartIcon />}
              // style={margin}
              className={classes.btn}
              variant="contained"
            >
              Edit Cart
            </Button>
            <Button type="submit" className={classes.btn} variant="contained">
              Pay Now
            </Button>
          </Box>
        </Grid>
      </form>
      <br />
      <Typography align="center" variant="subtitle1" color="textSecondary">
        Delivery will be done on the above mentioned address
      </Typography>
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CartBooks(props) {
  return (
    <Grid item xs={12} md={12}>
      <Item
        style={{
          position: "relative",
          height: "200px",
          display: "flex",
          alignItems: "start",
          width: "100%",
        }}
      >
        <div
          onClick={props.handleOpen}
          style={{
            width: "25%",
            height: "100%",
            background: `url(${"https://picsum.photos/200/300"}) no-repeat center center`,
            backgroundSize: "contain",
          }}
        />
        <Box>
          <Typography variant="h5" style={{ marginTop: "10px" }} align="left">
            {props.item.title}
          </Typography>
          <Typography variant="h6" style={{ marginTop: "10px" }} align="left">
            {props.item.description}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          style={{ position: "absolute", right: "4%", marginTop: "10px" }}
          align="left"
        >
          {`₹${props.item.price}`}
        </Typography>
      </Item>
    </Grid>
  );
}

function BookModalBody(props) {
  return (
    <>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        {"props.item.title"}
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}></Typography>
    </>
  );
}
function getPrice(cart) {
  let price = 0;
  cart?.forEach((ele) => {
    price += ele.book.price * ele.quantity;
  });
  return price;
}

export default function Checkout(props) {
  return (
    <div>
      <Box height="70px" />
      <Typography
        variant="h4"
        style={{
          margin: "1.5%",
        }}
      >
        Cart
      </Typography>
      <Box display="flex" justifyContent="center">
        <div
          style={{
            height: `${window.innerHeight - 170}px`,
            width: "75%",
            overflowY: "scroll",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            style={{
              width: "70vw",
            }}
          >
            {props.books?.map((item, i) => (
              <BookModal
                modalBody={BookModalBody}
                component={CartBooks}
                item={item}
                key={i}
              />
            ))}
          </Grid>
        </div>
        <Box width="25vw" display="flex" justifyContent="center">
          <Paper style={{ width: "90%", height: "fit-content" }}>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              width="100%"
              height="100%"
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Final Orders</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      {
                        rowName: `Price (${props.books?.length} items)`,
                        value: `₹${getPrice(props.books)}`,
                      },
                      {
                        rowName: `Total Amount`,
                        value: `₹${getPrice(props.books) - 700}`,
                        component: "h4",
                      },
                    ].map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box
                            component={row.component ? row.component : "div"}
                          >
                            {row.rowName}
                          </Box>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Box
                            component={row.component ? row.component : "div"}
                          >
                            {row.value}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <InputData />
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
