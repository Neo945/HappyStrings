import React from "react";
import "./App.css";
import { Table } from "./Table";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";

export default function Cart() {
  return (
    <div className="App">
      <AddShoppingCartIcon fontSize="large" />

      <h2 style={{ color: "#414757" }}>Cart</h2>
      <Table />
      <br />

      <Button
        startIcon={<AddShoppingCartIcon />}
        size="small"
        style={{
          fontSize: 20,
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          maxWidth: "30px",
          maxHeight: "30px",
          minWidth: "30px",
          minHeight: "30px",
        }}
        onClick={() => alert("ARE YOU SURE YOU WANT TO PROCEED?")}
        variant="contained"
        color="primary"
      >
        Continue Shopping <br />
      </Button>
      <br />
      <br />
      <Button
        size="small"
        style={{
          fontSize: 20,
          minWidth: 268,
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          maxWidth: "30px",
          maxHeight: "30px",
          minHeight: "30px",
        }}
        onClick={() => alert("ARE YOU SURE YOU WANT TO PROCEED?")}
        variant="contained"
        color="secondary"
      >
        Checkout
      </Button>
    </div>
  );
}
