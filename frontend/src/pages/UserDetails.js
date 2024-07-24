import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  useParams
} from "react-router-dom";
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





function UserDetailsPage() {
  const [list, setList] = React.useState([]);

  function loadUsers(data) {
    setList(data);
  }

  let { id } = useParams();

    function denyHandler(x){
        console.log(x);
    
    }

    useEffect(() => {
      axios
        .get("https://localhost:8000/users/", {
          headers: { token: global.config.user.token },
        })
        .then((res) => loadUsers(res.data))
        .catch(console.log);
    });
  
    if (!list.length) return <div>Loading...</div>;
   
  
  return (
    <div className="center">
      {/* <div>{global.config.user.token}</div> */}
      
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>{list[id-1].id}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[id-1].name}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[id-1].surname}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[id-1].email}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[id-1].phone}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[id-1].country}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[id-1].work_exp}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[id-1].education}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>{list[id-1].expertise}</Item>
          </Grid>
          
        </Grid>
      
    </div>
  );
}

export default UserDetailsPage;
