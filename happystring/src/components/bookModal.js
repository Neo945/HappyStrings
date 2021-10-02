import * as React from "react";
import {
  Paper,
  Typography,
  Fade,
  Modal,
  Box,
  Backdrop,
  makeStyles,
} from "@material-ui/core";
import book from "./static/book.jpg";

const useStyle = makeStyles((theme) => ({
  book: {
    height: "360px",
    width: "300px",
    display: "inline-block",
    margin: "10px",
    backgroundColor: "transparent",
    position: "relative",
    background: `url(${book}) no-repeat center`,
    backgroundSize: "contain",
  },
  bottomtxt: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "120px",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "white",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

export default function BookModal(props) {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Paper className={classes.book} onClick={handleOpen}>
        <Paper className={classes.bottomtxt}>
          <Typography
            style={{
              width: "50%",
              height: "100%",
              whiteSpace: "pre-wrap",
              display: "flex",
              alignItems: "center",
            }}
          >
            How to win friends and Influence people
          </Typography>
          <Typography style={{ width: "20%" }}>₹169.95</Typography>
        </Paper>
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
