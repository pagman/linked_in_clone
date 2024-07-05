import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";

import "../config";

const defaultValues = {
  img: "",
  name: "",
  category: "",
  description: "",
  buyprice: "",
  location: "",
  country: "",
  latitude: "",
  longtitude: "",
  starts: "",
  ends: "",
};

function AddAuctionPage() {
  const [formValues, setFormValues] = useState(defaultValues);
  const [requiredError, setRequiredError] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);

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
    console.log(formValues);
    if (
      (formValues.name !== "") &
      (formValues.buyprice !== "") &
      (formValues.location !== "") &
      (formValues.country !== "") &
      (formValues.latitude !== "") &
      (formValues.longtitude !== "") &
      (formValues.starts !== "") &
      (formValues.ends !== "") &
      (formValues.description !== "") &
      (formValues.img !== "") &
      (formValues.category !== "")
    ) {
      axios
        .post(
          "http://localhost:8080/register-auction/",
          {
            name: formValues.name,
            buy_price: formValues.buyprice,
            location: formValues.location,
            country: formValues.country,
            latitude: formValues.latitude,
            longtitude: formValues.longtitude,
            start: formValues.starts,
            ends: formValues.ends,
            description: formValues.description,
            photo: formValues.img.split(" "),
            category: formValues.category.split(" "),
          },
          {
            headers: { token: global.config.user.token },
          }
        )
        .then((response) => {
          console.log(response.data);
          setSuccessMessage(true)
        })
        .catch((error) => {
          setRequiredError(true);
          console.error("There was an error!", error);
        });
    } else {
      setRequiredError(true);
    }
  };

  return (
    <div className="center">
      <div>
        <h1 style={{ textAlign: "center" }}>Add Product</h1>
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
              label="Image Url"
            />
            <TextField
              required
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              label="Name"
            />
            <TextField
              required
              id="category"
              name="category"
              type="text"
              onChange={handleInputChange}
              label="Category"
            />
            <TextField
              required
              id="description"
              name="description"
              type="text"
              onChange={handleInputChange}
              label="Description"
            />
            <TextField
              required
              id="buyprice"
              name="buyprice"
              type="number"
              onChange={handleInputChange}
              label="Buying price"
            />
            <TextField
              required
              id="location"
              name="location"
              type="text"
              onChange={handleInputChange}
              label="Location"
            />
            <TextField
              required
              id="country"
              name="country"
              type="text"
              onChange={handleInputChange}
              label="Country"
            />
            <TextField
              required
              id="latitude"
              name="latitude"
              type="number"
              onChange={handleInputChange}
              label="Latitude"
            />
            <TextField
              required
              id="longtitude"
              name="longtitude"
              type="number"
              onChange={handleInputChange}
              label="Longtitude"
            />
            <TextField
              required
              id="starts"
              name="starts"
              label="Start Time"
              type="datetime-local"
              onChange={handleInputChange}
              defaultValue="2022-08-31T10:30"
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
              defaultValue="2022-08-31T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <center>
            <Button disabled={false} variant="outlined" type="submit">
              Submit
            </Button>
            {requiredError ? (
              <Alert severity="error">
                There was an error
              </Alert>
            ) : null}
            {successMessage ? (
              <Alert severity="success">This is a success! — auction added!</Alert>
            ) : null}
          </center>
        </Box>
      </div>
    </div>
  );
}

export default AddAuctionPage;
