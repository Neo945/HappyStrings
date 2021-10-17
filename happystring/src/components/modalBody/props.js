import { Typography } from "@material-ui/core";
import React from "react";

function Book(props) {
  return (
    <div>
      <Typography
        component="h2"
        style={{ textAlign: "left", fontSize: "1.5em", fontWeight: "bolder" }}
      >
        {props.name}
      </Typography>
      <Typography component="h4" style={{ textAlign: "left" }}>
        By {props.author}
      </Typography>
      <Typography
        component="h1"
        style={{ textAlign: "left", fontSize: "2em", fontWeight: "bolder" }}
      >
        ₹{props.price}
      </Typography>
      <Typography component="p" style={{ textAlign: "left" }}>
        Description - {props.description}
      </Typography>
      <br />
      <Typography
        component="pre"
        style={{ textAlign: "left", fontWeight: "bolder" }}
      >
        {`Available offers \n\tBank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card T&C\n\tBank Offer 15% Instant discount on first Pay Later order of ₹500 and above T&C\n`}
      </Typography>
    </div>
  );
}

export default Book;
