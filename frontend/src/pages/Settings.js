import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../config";
import { useEffect } from "react";
import '../config';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));





function SettingsPage() {
  const navigate = useNavigate();
  const [list, setList] = React.useState([]);
  const [email, setEmail] = React.useState(" ");
  const [pass, setPass] = React.useState(" ");

  function handleTextFieldChange(event) {
    console.log(event.target.value);
    setEmail(event.target.value);
  }

  function doSomethingWithInput(event) {
    axios
        .put("https://localhost:8000/users/"+global.config.user.id+"/change-username", {
          new_username: email
        })
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    console.log(email);

  }

  function handleTextFieldChangePass(event) {
    console.log(event.target.value);
    setPass(event.target.value);
  }

  function doSomethingWithInputPass(event) {
    axios
        .put("https://localhost:8000/users/"+global.config.user.id+"/change-password", {
          new_password: pass
        })
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    console.log(pass);

  }
 
  function loadUsers(data) {
    setList(data);
  }
    useEffect(() => {
      axios
        .get("https://localhost:8000/users/", {
          headers: { token: global.config.user.token },
        })
        .then((res) => loadUsers(res.data))
        .catch(console.log);
    },[100]);
  
    // if (!list.length) return <div>Loading...</div>;   
  
  return (
    <div className="center">
      <div>{global.config.user.id}</div>
      
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <Item><TextField id="standard-basic" value={list[global.config.user.id-1].email} variant="standard"  /></Item>
          </Grid> */}
          <Grid item xs={6}>
          <TextField id="filled-basic" label="New email" variant="filled" onChange={(e) => handleTextFieldChange(e)} />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={(e) => doSomethingWithInput(e)}
        >
          Change Username
        </Button>
          </Grid>
          <Grid item xs={6}>
          <TextField id="filled-basic" label="Update Password" variant="filled" onChange={(e) => handleTextFieldChangePass(e)} />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={(e) => doSomethingWithInputPass(e)}
        >
        change Pass
        </Button>
          </Grid>
          
          {/* <Grid item xs={6}>
            <Item>{list[global.config.user.id].name}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[global.config.user.id].surname}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[global.config.user.id].email}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[global.config.user.idd].phone}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[global.config.user.id].country}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[global.config.user.id].work_exp}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[global.config.user.id].education}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[global.config.user.id].expertise}</Item>
          </Grid> */}
          
        </Grid>
      
    </div>
  );
}

export default SettingsPage;
