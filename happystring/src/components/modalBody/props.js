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
        By {"props.author"}
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
      <Typography
        component="p"
        style={{ textAlign: "left", fontWeight: "bolder" }}
      >
        Offers{" "}
      </Typography>
    </div>
  );
}

export default Book;
