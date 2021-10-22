import React from "react";
import {
  Box,
  Button,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";

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
