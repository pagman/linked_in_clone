import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import "../App.css"
import axios from "axios";
import AlertDialogComments from "./comments";



export default function AllCommentsCard(props) {

  const handleAccept = (e) => {
    console.log("Accept");
      axios.put('https://localhost:8000/friends/requests/'+props.id,
          {
          
          }).then((response) => {
            console.log(response.data);
          })
          .catch(console.log);
      console.log("liked");
    
  }


  return (
    <div className = 'myCard'>
    <Card sx={{ minWidth: 275 }}>
      <CardContent style={{backgroundColor: props.status=="pending" ?"#2ECC71":"#C70039"}}>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        
      </CardContent>
      <CardActions>
      <AlertDialogComments
                    inactive={false}
                    interested_users={props.comments}
                  />
        {/* <AlertDialog
                    inactive={false}
                    interested_users={props.comments}
                  /> */}      
      </CardActions>
    </Card>
    </div>
  );
}
