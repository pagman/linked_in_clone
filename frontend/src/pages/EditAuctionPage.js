import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import "../config";

const defaultValues = {
  img: "",
  name: "",
  category: "",
  description: "",
  startbid: "",
  location: "",
  longtitude: "",
  latitude: "",
  country: "",
  starts: "",
  ends: "",
};

function EditAuctionPage() {
  let { id } = useParams();
  const [formValues, setFormValues] = useState(defaultValues);
  const [list, setList] = React.useState();
  const [Error, setError] = React.useState(false);
  const [requiredError, setRequiredError] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);

  function loadAuctions(data) {
    setList(data);
    console.log(data);
    console.log("setting...");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(formValues);
    axios
      .post(
        "http://localhost:8080/modify-auction/",
        {
          id: id,
          name: (formValues.name===""?list.name:formValues.name),
          buy_price: (formValues.startbid===""?list.buy_price:formValues.startbid),
          location: (formValues.location===""?list.location:formValues.location),
          country: (formValues.country===""?list.country:formValues.country),
          start: (formValues.starts===""?list.start:formValues.starts),
          ends: (formValues.ends===""?list.ends:formValues.ends),
          description: (formValues.description===""?list.description:formValues.description),
          longtitude: (formValues.longtitude===""?list.longtitude:formValues.longtitude),
          latitude: (formValues.latitude===""?list.latitude:formValues.latitude),
          categories: (formValues.category===""?[list.categories[0].name]:formValues.category.split(" ")),
          photos: (formValues.img===""?[list.photos[0].URL]:formValues.img.split(" ")),
          // "id": 2,
          // "name": 
          // "buy_price": (formValues.startbid===""?list.buy_price:formValues.startbid),
          // "location": (formValues.location===""?list.location:formValues.location),
          // "country": (formValues.country===""?list.country:formValues.country),
          // "start": (formValues.starts===""?list.start:formValues.starts),
          // "ends": (formValues.ends===""?list.ends:formValues.ends),
          // "description": (formValues.description===""?list.description:formValues.description),
          // "longtitude": (formValues.longtitude===""?list.longtitude:formValues.longtitude),
          // "latitude": (formValues.latitude===""?list.latitude:formValues.latitude),
          // "categories": (formValues.category===""?list.categories:formValues.category.split(" ")),
          // "photos": (formValues.img===""?list.photos:formValues.img.split(" "))
        },
        {
          headers: { token: global.config.user.token },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSuccessMessage(true);
      })
      .catch((error) => {
        setRequiredError(true);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/get-auction/" + id + "/", {})
      .then((res) => {
        loadAuctions(res.data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, []);

  if (!list) return <div>Loading...</div>;

  return (
    <div className="center">
      <div>
        <h1 style={{ textAlign: "center" }}>Edit Auction</h1>
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="img"
              name="img"
              type="text"
              onChange={handleInputChange}
              defaultValue={list.photos[0].URL}
            />
            <TextField
              required
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              defaultValue={list.name}
            />
            <TextField
              required
              id="category"
              name="category"
              type="text"
              onChange={handleInputChange}
              defaultValue={list.categories[0].name}
            />
            <TextField
              required
              id="description"
              name="description"
              type="text"
              onChange={handleInputChange}
              defaultValue={list.description}
            />
            <TextField
              required
              id="startbid"
              name="startbid"
              type="number"
              onChange={handleInputChange}
              defaultValue={list.buy_price}
            />
            <TextField
              required
              id="location"
              name="location"
              type="text"
              onChange={handleInputChange}
              defaultValue={list.location}
            />
            <TextField
              required
              id="country"
              name="country"
              type="text"
              onChange={handleInputChange}
              defaultValue={list.country}
            />
            <TextField
              required
              id="latitude"
              name="latitude"
              type="text"
              onChange={handleInputChange}
              defaultValue={list.latitude}
            />
            <TextField
              required
              id="longtitude"
              name="longtitude"
              type="text"
              onChange={handleInputChange}
              defaultValue={list.longtitude}
            />
            <TextField
              required
              id="starts"
              name="starts"
              label="Start Time"
              type="datetime-local"
              onChange={handleInputChange}
              defaultValue={list.start}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="ends"
              name="ends"
              label="End Time"
              type="datetime-local"
              onChange={handleInputChange}
              defaultValue={list.ends}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <center>
            <Button disabled={false} variant="outlined" type="submit">
              Submit
            </Button>

            {Error ? <Alert severity="error">Unable to change</Alert> : null}
            {requiredError ? (
              <Alert severity="error">There was an error</Alert>
            ) : null}
            {successMessage ? (
              <Alert severity="success">
                This is a success! — auction added!
              </Alert>
            ) : null}
          </center>
        </Box>
      </div>
    </div>
  );
}

export default EditAuctionPage;
