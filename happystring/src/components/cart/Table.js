import MaterialTable from "material-table";
import { Link } from "@material-ui/core";
import "./App.css";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

export const Table = () => {
  const data = [
    {
      id: 1,
      product: "Book1",
      price: 300,
      quantity: 3,
      total: 900,
      delete: "Remove",
    },
    {
      id: 2,
      product: "Book2",
      price: 850,
      quantity: 1,
      total: 850,
      delete: "Remove",
    },
    {
      id: 3,
      product: "Book3",
      price: 570,
      quantity: 2,
      total: 1140,
      delete: "Remove",
    },
    {
      id: 4,
      product: "Book4",
      price: 600,
      quantity: 1,
      total: 600,
      delete: "Remove",
    },
    {
      id: 5,
      product: "Book5",
      price: 800,
      quantity: 2,
      total: 1600,
      delete: "Remove",
    },
    {
      id: "",
      product: "",
      price: "",
      quantity: "TOTAL = ",
      total: 5090,
      delete: "",
    },
  ];

  const total = [{ total: 5090 }];

  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Product",
      field: "product",
    },
    {
      title: "Price (in Rs)",
      field: "price",
    },
    {
      title: "Quantity",
      field: "quantity",
      type: "number",
    },
    {
      title: "Total",
      field: "total",
    },
    {
      title: "Delete Items",
      field: "delete",
      render: (rowData) => <Link>{rowData.delete}</Link>,
    },
  ];
  return (
    <div>
      <div style={{ backgroundColor: "black" }}>
        <WhiteTextTypography variant="h3">CART</WhiteTextTypography>
      </div>
      <MaterialTable
        title="My Cart"
        style={{ backgroundColor: "#d6d6d6" }}
        data={data}
        columns={columns}
        total={total}
        options={{
          search: false,
          paging: false,
        }}
      />
    </div>
  );
};
