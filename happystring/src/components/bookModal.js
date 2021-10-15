import * as React from "react";
import { Fade, Modal, Box, Backdrop } from "@material-ui/core";
import DetailsPage from "./modalBody/DetailsPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "hsl(0deg 1% 16%)",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

export default function BookModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <props.component
        handleOpen={handleOpen}
        fun={props.fun}
        item={props.item}
      />
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
            <DetailsPage item={props.item} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
