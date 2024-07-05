import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "../config";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(props.auction_id);
    setOpen(false);
    let nodeDate = require("date-and-time");
    let now = nodeDate.format(new Date(), "YYYY-MM-DDThh:mm:ss");
    console.log(now);
    console.log(props.bidValue)
    axios
      .post(
        "http://localhost:8080/bid/",
        {
          auction_id: props.auction_id,
          time: now.toString(),
          amount: props.bidValue,
        },
        {
          headers: { token: global.config.user.token },
        }
      )
      .then((response) => {
        console.log(response.data.role, response.data.token);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <Button
        disabled={props.inactive}
        variant="contained"
        onClick={handleClickOpen}
      >
        Bid
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After pressing submit you cannot change the bid.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
