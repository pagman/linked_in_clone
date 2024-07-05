import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import "../App.css"
import { Link } from "react-router-dom";



export default function BasicCard(props) {
  return (
    <div className = 'myCard'>
    <Card sx={{ minWidth: 275 }}>
    <CardMedia
        component="img"
        height="160"
        image={props.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.header}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.id}
        </Typography>
        <Typography variant="h7" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.categories}
        </Typography>
        <Typography variant="body2">
          {props.description}.
          <br />
        </Typography>
      </CardContent>
      <CardActions>
      <Link style={{ textDecoration: "none" }} to={"/product/"+props.id}>
        <Button size="small">Learn More</Button>
      </Link>
      </CardActions>
    </Card>
    </div>
  );
}
