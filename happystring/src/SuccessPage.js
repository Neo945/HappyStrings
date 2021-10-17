import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Card,
  CardContent,
  CardActions,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MuiThemeProvider,
} from "@material-ui/core";
import { styled } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import BookModal from "./components/bookModal";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Link from "@material-ui/core/Link";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: "50vw",
    margin: "auto",
    borderRadius: "10px",
    textAlign: "center",
    paddingBottom: "1vh",
    marginTop: "30vh",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SuccessPage() {
  const classes = useStyles();

  return (
    <>
      <Box height="80px" />
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Payment was successful.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            style={{ width: "7vw", margin: "auto" }}
          >
            go back
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
