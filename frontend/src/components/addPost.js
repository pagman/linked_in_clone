import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "../config";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";


const defaultValues = {
  title: "",
  description: "",
  video:" "
};


export default function AddPost(props) {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = useState(defaultValues);
  const [img, setImg] = React.useState(" ");
  const [audio, setAudio] = React.useState(" ");
  const [video, setVideo] = React.useState(" ");
  const navigate = useNavigate();  // console.log(listItems);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(e.target.value);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues.title);
    console.log(formValues.description);
    console.log(formValues.video);
    console.log(img);
    console.log(video);
    axios
    .post(
      "https://localhost:8000/create-post/",
      {
        title: formValues.title,
        description: formValues.description,
        img: img,
        audio: audio,
        video: formValues.video,

      },
      {
        headers: { token: global.config.user.token },
      }
    )
        .then((response) => {
          console.log(response.data);
          setOpen(false);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  };

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  function uploadImage(e) {
    console.log(e.target.files[0].name);
    setImg(e.target.files[0].name);
}
function uploadAudio(e) {
  console.log(e.target.files[0].name);
  setAudio(e.target.files[0].name);
}



  return (
    <div>
      <Button
        disabled={props.inactive}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add Post
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div>
            <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            >           
          <TextField
              required
              id="title"
              name="title"
              type="text"
              onChange={handleInputChange}
              label="Title"
            />
            <TextField
              required
              id="description"
              name="description"
              type="text"
              onChange={handleInputChange}
              label="Description"
            />
            <TextField
              required
              id="video"
              name="video"
              type="text"
              onChange={handleInputChange}
              label="Youtube video"
            />
            <div className="center">
            select Image:  
            <input type="file" onChange={uploadImage} />
            </div>
            <div className="center">
            select Audio:  
            <input type="file" onChange={uploadAudio} />
            </div>
            <div className="center">
            <Button disabled={false} variant="outlined" type="submit">
              Submit
            </Button>
            
          </div>
          </Box>
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
