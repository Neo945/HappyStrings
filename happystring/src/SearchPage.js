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
import BookModal from "./components/bookModal";
import FilterAltIcon from "@material-ui/icons/FilterAlt";

const cart = [
  {
    id: 1,
    name: "Product 1",
    price: "10",
    quantity: 1,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 1,
    name: "Product 1",
    price: "10",
    quantity: 1,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 1,
    name: "Product 1",
    price: "10",
    quantity: 1,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 1,
    name: "Product 1",
    price: "10",
    quantity: 1,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 1,
    name: "Product 1",
    price: "10",
    quantity: 1,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 1,
    name: "Product 1",
    price: "10",
    quantity: 1,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "Product 2",
    price: "10",
    quantity: 2,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    name: "Product 3",
    price: "10",
    quantity: 3,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    name: "Product 4",
    price: "10",
    quantity: 4,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 5,
    name: "Product 5",
    price: "10",
    quantity: 5,
    image: "https://picsum.photos/200/300",
  },
];

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
            background: `url(${props.item.image}) no-repeat center center`,
            backgroundSize: "cover",
          }}
        />
        <Typography variant="h5" style={{ marginTop: "10px" }} align="left">
          {props.item.name}
        </Typography>
        <Box position="absolute" bottom="10px" width="90%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <IconButton aria-label="add">
                <AddIcon />
              </IconButton>
              <Typography>{0}</Typography>
              <IconButton aria-label="add">
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

export default function SearchPage(props) {
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
            {cart.map((item, i) => (
              <BookModal component={CartBooks} item={item} key={i} />
            ))}
          </Grid>
        </div>

        <div>
          {/* <Box width="25vw" display="flex" justifyContent="center">
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
                            rowName: `Price (${cart.length} items)`,
                            value: `₹91,989`,
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
                            value: `₹91,989`,
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
            </Box> */}

          <Box width="25vw" display="flex" justifyContent="center">
            <Paper style={{ width: "80%" }}>
              <p style={{ marginLeft: "15px" }}>Filters</p>
              starticon = <FilterAltIcon />
            </Paper>
          </Box>
        </div>
      </Box>
    </div>
  );
}
