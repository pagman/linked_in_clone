import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "../config";

export default function AlertDialogComments(props) {
  const [open, setOpen] = React.useState(false);
  const listItems = props.interested_users.map((d) => <li key={d}>{d}</li>);
  console.log(listItems);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  return (
    <div>
      <Button
        disabled={props.inactive}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Comments
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Comments"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div>
          {listItems }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}