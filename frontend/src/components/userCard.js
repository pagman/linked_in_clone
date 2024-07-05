import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import "../App.css"



export default function UserCard(props) {
  return (
    <div className = 'myCard'>
    <Card sx={{ minWidth: 275 }}>
      <CardContent style={{backgroundColor: props.validated ?"#2ECC71":"#C70039"}}>
        <Typography variant="h5" component="div">
          {props.username}
        </Typography>
        
      </CardContent>
      <CardActions>
      <Link style={{ textDecoration: "none" }} to={"/userdetails/"+props.id}> 
        <Button size="small"> More</Button>
        </Link>
      </CardActions>
    </Card>
    </div>
  );
}
