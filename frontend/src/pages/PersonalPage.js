import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AlertDialog from "../components/dialog";
import BuyNowDialog from "../components/buynowdialog";
import { listSubheaderClasses, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import "../config";
import AddIcon from '@material-ui/icons/Add';

const defaultValues = {
  bid: 0.0,
};

function createData(userID, time, amount) {
  return { userID, time, amount };
}

const rows = [
  createData("danobody", "Dec-10-01 08:25:26)", 6.5),
  createData("daeveryone", "Dec-10-01 08:1:26)", 7.2),
  createData("danoone", "Dec-10-01 08:26:21)", 8.9),
];

export default function PersonalPage() {
  // const handleMessage = () => {
  //   navigate("/chat/" + list.seller_id + "A" + list.id);
  // };

  // const handleDownload = () => {
  //   console.log('pressed')
  //   axios.get("http://localhost:8080/admin-get-auction/" + id + "/", {
  //     headers: { token: global.config.user.token, 'media-type': 'application/xml' },      
  //   })
  //   .then((response) => response.data)
  // .then((blob) => {
  //   // Create blob link to download
  //   const url = window.URL.createObjectURL(
  //     new Blob([blob]),
  //   );
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute(
  //     'download',
  //     list.name+".xml"
  //   );
  //   // Append to html link element page
  //   document.body.appendChild(link);
  //   // Start download
  //   link.click();
  //   // Clean up and remove the link
  //   link.parentNode.removeChild(link);
  // });
  // };


  let { id } = global.config.user.id;
  const [formValues, setFormValues] = useState(defaultValues);
  const [username, setUsername] = React.useState("");
  const [work_exp, setWork_exp] = React.useState("");
  const [work_exp_visible, setWork_exp_visible] = React.useState(true);
  const [education, setEducation] = React.useState("");
  const [education_visible, setEducation_visible] = React.useState(true);
  const [expertise, setExpertise] = React.useState("");
  const [expertise_visible, setExpertise_visible] = React.useState(true);
  const [LatLng, setLatLng] = React.useState([0.0, 0.0]);
  const [img, setImg] = React.useState(
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
  );
  const [winner, setWinner] = React.useState(false);
  const [currentBid, setCurrentBid] = React.useState(0);

  const navigate = useNavigate();

  // function loadAuctions(data) {
  //   setList(data);
  //   console.log(list);
  //   console.log(list.bids);
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  React.useEffect(() => {
    axios
      .get("https://localhost:8000/get-user_id/{user_id}/?id="+global.config.user.id , {
      })
      .then((res) => {
        // loadAuctions(res.data);
        setUsername(res.data.username);
        console.log(res.data.name);
      })
      .catch(console.log);
  }, []);


  return (
    <div className="center">
      <div>{global.config.user.id}</div> 
      <div>{username}</div> 
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <center>
                {" "}
                <img className="shopImg" src={img} alt="new" />
                <Button
          variant="outlined"
          startIcon={<AddIcon />}
          // onClick={(e) => doSomethingWithInputPass(e)}
        >
        change Image
        </Button>
              </center>
            </Grid>
            <Grid item xs={6}>
              {/* <h2>{list.name}</h2> */}
              <div className="center">
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
                    id="bid"
                    name="bid"
                    type="number"
                    onChange={handleInputChange}
                    label={currentBid}
                  />
                  <AlertDialog
                    inactive={false}
                    bidValue={formValues.bid}
                    auction_id={id}
                  />
                </Box>
              </div>
              <div className="center">
                <Box
                  onSubmit={handleSubmit}
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Typography variant="h2" component="h2">
                    {/* {list.buy_price} € */}
                  </Typography>
                  {/* <BuyNowDialog inactive={false} bidValue={list.buy_price} /> */}
                </Box>
              </div>
              <div className="center"></div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <container>
        <br></br>
        {/* {list.description} */}
      </container>
      
    </div>
  );
}
