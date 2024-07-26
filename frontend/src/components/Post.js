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
import MultiPlayer from "../components/useMultiAudio";




export default function Post(props) {
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    axios.put('https://localhost:8000/post/show_interest/?id='+props.id+'&name='+props.username,
        {
        
        }).then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch(console.log);
    console.log("liked");
  }

  console.log(props.interested_users)

  
  
  
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
          Title: {props.title}
        </Typography>
        <Typography variant="body2">
          Content: {props.description}.
          <br />
        </Typography>
        {props.video!=" " ? (
            <a style={{ textDecoration: "none" }} href={props.video} target="_blank" rel="noopener noreferrer">
            <button>{'Play Video'}</button>
          </a>
          ) : null}
          {props.audio!=" " ? (
            <MultiPlayer
            urls={[
              '/'+props.audio,
            ]}
          />
          ) : null}

        
      </CardContent>
      <CardActions>
        <Button onClick={e => { handleSubmit(props) }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        </Button>
        {/* <Typography variant="body2">
        {props.interested_users.slice(0,1)}
          <br />
        </Typography> */}
        <AlertDialog
                    inactive={false}
                    interested_users={props.interested_users}
                  />
        
      {/* <Link style={{ textDecoration: "none" }} to={"/product/"+props.id}>
        <Button size="small">Learn More</Button>
      </Link> */}
      </CardActions>
    </Card>
    </div>
  );
}
