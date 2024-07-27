import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import "../App.css"
import { Link } from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./dialog";
import MultiPlayer from "./useMultiAudio";




export default function UsersCard(props) {
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    console.log("See more");
  }

// const exists = props.friends.some(item => item.requestee_name === props.username);
const exists = props.friends.some(item => item.requester_id === props.id);

  

  
  
  
  return (
    <div className = 'myCard'>
      
    <Card sx={{ minWidth: 275 }}>
    <CardMedia
        component="img"
        height="160"
        image={"/"+props.img}
        
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="h7" component="div">
          Name: {props.name}
        </Typography>
        <Typography variant="body2">
          Surname: {props.surname}.
          <br />
        </Typography> 
        {exists ? (
            <Typography variant="body2">
            Friends
          </Typography> 
          ) : null}       
      </CardContent>
      <CardActions>
      <Link style={{ textDecoration: "none" }} to={"/userdetails/"+props.id}> 
        <Button variant="text" onClick={e => { handleSubmit(props) }}>
        See more
        </Button>
        </Link>
      </CardActions>
    </Card>
    </div>
  );
}
