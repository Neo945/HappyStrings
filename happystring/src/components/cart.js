import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { styled } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import BookModal from "./bookModal";

const useStyle = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "50px",
    width: "fit-content",
    padding: "0px 20px",
    borderRadius: "50px",
    fontSize: "1em",
    color: "#ffffff",
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function BookModalBody() {
  return (
    <>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </>
  );
}

function CartBooks(props) {
  const classes = useStyle();
  return (
    <Grid item xs={3} md={3}>
      <Item style={{ position: "relative", height: "400px" }}>
        <div
          onClick={props.handleOpen}
          style={{
            width: "100%",
            height: "60%",
            background: `url(${props.item.book.image}) no-repeat center center`,
            backgroundSize: "cover",
          }}
        />
        <Typography variant="h5" style={{ marginTop: "10px" }} align="left">
          {props.item.book.name}
        </Typography>
        <Box position="absolute" bottom="10px" width="90%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <IconButton
                aria-label="add"
                onClick={() => {
                  props.fun[2](props.fun[1], props.item.book._id);
                }}
              >
                <AddIcon />
              </IconButton>
              <Typography>{props.item.quantity}</Typography>
              <IconButton
                aria-label="remove"
                onClick={() => {
                  props.fun[2](props.fun[0], props.item.book._id);
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
            <Button className={classes.submit} variant="contained">
              Remove
            </Button>
          </Box>
        </Box>
      </Item>
    </Grid>
  );
}

function getPrice(cart) {
  let price = 0;
  cart.forEach((ele) => {
    price += ele.book.price * ele.quantity;
  });
  return price;
}

export default function CartV2(props) {
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
      <Box
        display="flex"
        justifyContent="space-between"
        style={{
          height: `${window.innerHeight - 70}px`,
          overflowY: "scroll",
        }}
      >
        <div>
          <Grid
            container
            spacing={2}
            style={{
              marginLeft: "5%",
              width: "70vw",
            }}
          >
            {props.cart.map((item, i) => (
              <BookModal
                component={CartBooks}
                modalBody={BookModalBody}
                item={item}
                fun={[props.removeFromCart, props.setCart, props.addToCart]}
                key={i}
              />
            ))}
          </Grid>
        </div>
        <div>
          <Box width="25vw" display="flex" justifyContent="center">
            <Paper style={{ width: "80%" }}>
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
                        <TableCell align="left">PRICE DETAILS</TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        {
                          rowName: `Price (${props.cart.length} items)`,
                          value: `₹${getPrice(props.cart)}`,
                        },
                        {
                          rowName: `Discounts`,
                          value: `- ₹700`,
                        },
                        {
                          rowName: `Delivery Charges`,
                          value: `FREE`,
                        },
                        {
                          rowName: `Total Amount`,
                          value: `₹${getPrice(props.cart) - 700}`,
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
                <Typography style={{ margin: "10px" }}>
                  You will save ₹700 on this order
                </Typography>
              </Box>
            </Paper>
          </Box>
        </div>
      </Box>
    </div>
  );
}
