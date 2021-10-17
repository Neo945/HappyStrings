import { useState } from "react";
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

function InputData(props) {
  const [information, setInformation] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    address: JSON.parse(localStorage.getItem("user")).address,
    cardname: "",
  });
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();
  const classes = useStyle();
  return (
    <div style={{ padding: "10px" }}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const res = lookup(
            "POST",
            {
              information,
              cart: props.books,
            },
            "/auth/checkout",
          );
          if (res[1] === 201) {
            props.fun(1, res[0].message);
          } else {
            props.fun(1, res[0].message);
            alert("Something went wrong");
          }
          console.log(information);
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} item>
            <TextField
              value={information.cardname}
              onChange={(e) => {
                setInformation({
                  ...information,
                  cardname: e.target.value,
                });
              }}
              {...{
                name: "cardname",
                label: "Name on Card",
                placeholder: "Name on Card",
                variant: "outlined",
                fullWidth: true,
                required: true,
              }}
            />
          </Grid>
          <Grid xs={12} sm={12} item>
            <TextField
              value={information.address}
              onChange={(e) => {
                setInformation({
                  ...information,
                  address: e.target.value,
                });
              }}
              {...{
                name: "address",
                label: "Billing Address",
                multiline: true,
                placeholder: "Enter Billing Address",
                variant: "outlined",
                fullWidth: true,
                required: true,
              }}
            />
          </Grid>
          <Grid xs={12} sm={12} item>
            <PaymentInputsWrapper {...wrapperProps} styles={cardStyle}>
              <svg
                style={{ backgroundColor: "#424242" }}
                {...getCardImageProps({ images })}
              />
              <input
                required
                style={{
                  backgroundColor: "#424242",
                  width: "65%",
                  marginRight: "10%",
                }}
                {...getCardNumberProps({
                  onChange: (value) => {
                    setInformation({
                      ...information,
                      cardNumber: value.target.value,
                    });
                  },
                })}
              />
              <input
                required
                style={{ backgroundColor: "#424242" }}
                {...getExpiryDateProps({
                  onChange: (value) => {
                    setInformation({
                      ...information,
                      expiry: value.target.value,
                    });
                  },
                })}
              />
              <input
                required
                style={{ backgroundColor: "#424242" }}
                {...getCVCProps({
                  onChange: (value) => {
                    setInformation({
                      ...information,
                      cvc: value.target.value,
                    });
                  },
                })}
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
            {props.item.book.title}
          </Typography>
          <Typography variant="h6" style={{ marginTop: "10px" }} align="left">
            {props.item.book.description}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          style={{ position: "absolute", right: "4%", marginTop: "10px" }}
          align="left"
        >
          {`₹${props.item.book.price}`}
        </Typography>
      </Item>
    </Grid>
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
  const cart = JSON.parse(localStorage.getItem("purchase"));
  const classes = useStyle();
  const [status, setStatus] = useState({ status: 0, message: "" });
  return (
    <>
      {status.status === 0 ? (
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
                {cart?.map((item, i) => (
                  <BookModal component={CartBooks} item={item} key={i} />
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
                            rowName: `Price (${cart?.length} items)`,
                            value: `₹${getPrice(cart)}`,
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
                                component={
                                  row.component ? row.component : "div"
                                }
                              >
                                {row.rowName}
                              </Box>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <Box
                                component={
                                  row.component ? row.component : "div"
                                }
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
                <InputData books={props.books} fun={setStatus} />
              </Paper>
            </Box>
          </Box>
        </div>
      ) : (
        <Box width="100vw" height="100vh">
          <Paper>
            <Typography variant="h4" align="center">
              {status.message}
            </Typography>
            <Button
              className={classes.btn}
              onClick={() => {
                window.location.href = "/search";
              }}
            >
              Go Back
            </Button>
          </Paper>
        </Box>
      )}
    </>
  );
}
