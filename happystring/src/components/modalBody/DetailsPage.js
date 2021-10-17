import React from "react";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  makeStyles,
  Box,
} from "@material-ui/core";

import Rating from "@material-ui/lab/Rating";
import Book from "./props";
import ReactImageMagnify from "react-image-magnify";
import { reviewForm } from "./feedback";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const useStyle = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "50px",
    width: "200px",
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

function DetailsPage(props) {
  const classes = useStyle();
  console.log([{ ...props.item, quantity: 1 }]);
  return (
    <>
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="start"
        justifyContent="center"
      >
        <Card
          style={{
            width: "450px",
            height: "fit-content",
            marginLeft: "auto",
            position: "relative",
          }}
        >
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: props.item.book.name,
                isFluidWidth: true,
                src: "https://cdn4.buysellads.net/uu/1/97758/1633132110-1633110694-158338930.jpg",
              },
              largeImage: {
                src: "https://cdn4.buysellads.net/uu/1/97758/1633132110-1633110694-158338930.jpg",
                width: 1200,
                height: 1800,
              },
            }}
          />
          <br />
          <Box
            // position="absolute"
            // bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            width="100%"
          >
            <Button
              startIcon={<AddShoppingCartIcon />}
              className={classes.submit}
              type="submit"
              variant="contained"
              onClick={() => props.add(props.setCart, props.item.book)}
            >
              Add to Cart
            </Button>

            <Button
              className={classes.submit}
              type="submit"
              variant="contained"
              onClick={() => {
                localStorage.setItem(
                  "purchase",
                  JSON.stringify([{ ...props.item, quantity: 1 }]),
                );
                window.location.href = "/checkout";
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Card>

        <Card
          style={{
            width: "75%",
            height: "100%",
            marginRight: "auto",
            marginLeft: "20px",
            padding: "20px 5px",
            position: "relative",
          }}
        >
          <CardContent>
            <div>
              <Book
                name={props.item.book.title}
                price={props.item.book.price}
                description={props.item.book.description}
                author={props.item.book.author.name}
              />
            </div>
            <br />
            <Box position="absolute" bottom="5%" width="90%">
              <Typography gutterBottom variant="h5" align="left">
                Ratings and Reviews
              </Typography>
              <Box textAlign={"left"}>
                <Rating name="customized-10" defaultValue={2} max={5} />
              </Box>
              {reviewForm.map((input) => (
                <Grid xs={input.xs} sm={input.sm} item>
                  <TextField {...input} />
                </Grid>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default DetailsPage;
