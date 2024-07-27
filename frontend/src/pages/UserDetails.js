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
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from "@mui/material/Box";
import { useNavigate} from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));





function UserDetailsPage() {
  const [list, setList] = React.useState([]);
  const [friends, setfriends] = React.useState([]);
  const navigate = useNavigate();


  function loadFriends(data) {
    console.log("-----------------")
    console.log(data[0].requestee_name)
    console.log("-----------------")
    setfriends(data);
  }

  function loadUsers(data) {
    setList(data);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Send message");
    navigate("/chat/" + list[id-1].id + "A" + global.config.user.id);
  };

  const handleFriend = (event) => {
    event.preventDefault();
    console.log("Add friend");
    axios
        .post("https://localhost:8000/friends/requests", {
          requester_id: global.config.user.id,
          requestee_id: list[id-1].id,
          requestee_name: global.config.user.role,
          status: "pending"
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });



  };

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

    useEffect(() => {
      axios
           .get("https://localhost:8000/users/"+global.config.user.id+"/friends", {
             headers: { token: global.config.user.token },
             params: {
             },
           })
           .then((res) => loadFriends(res.data))
           .catch(console.log);
       
   
     
     },[]);

     

  
    if (!list.length) return <div>Loading...</div>;

    const exists = friends.some(item => item.requester_id === list[id-1].id);
    console.log("------------")
    console.log(friends[0].requester_id)
    console.log(global.config.user.id)
    console.log(exists)
    console.log("------------")
   
  
  return (
    <div className="center">
      {/* <div>{global.config.user.token}</div> */}
      
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <CardMedia
        component="img"
        height="160"
        image={"/"+list[id-1].img}
        
        alt="green iguana"
      />
          </Grid>
          <Grid item xs={12}>
            <Item>ID: {list[id-1].id}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Name: {list[id-1].name}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Surname: {list[id-1].surname}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Email: {list[id-1].email}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Phone: {list[id-1].phone}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Country: {list[id-1].country}</Item>
          </Grid>
          {exists || global.config.user.role=='admin'||list[id-1].work_exp==true ? (
            <Grid item xs={6}>
            <Item>Work experience: {list[id-1].work_exp}</Item>
          </Grid>
          ) : null}
          {exists || global.config.user.role=='admin'||list[id-1].work_exp==true ? (
            <Grid item xs={6}>
            <Item>Education: {list[id-1].education}</Item>
          </Grid>
          ) : null} 
          {exists || global.config.user.role=='admin'||list[id-1].work_exp==true ? (
            <Grid item xs={6}>
            <Item>Expertise {list[id-1].expertise}</Item>
          </Grid>
          ) : null} 
          {exists || global.config.user.role=='admin'||list[id-1].work_exp==true ? (
            <Grid item xs={12}>
            <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Button disabled={false} variant="outlined" type="submit">
              Send Message
            </Button>
              </Box>
          </Grid>
          ) : null}
          {!exists ? (
            <Grid item xs={12}>
            <Box
            onSubmit={handleFriend}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Button disabled={false} variant="outlined" type="submit">
              Add friend
            </Button>
              </Box>
          </Grid>
          ) : null} 
        </Grid>
      
    </div>
  );
}

export default UserDetailsPage;
