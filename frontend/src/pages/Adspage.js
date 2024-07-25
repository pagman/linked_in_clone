import * as React from "react";
import { useEffect } from "react";
import BasicCard from "../components/Card";
import TablePagination from "@mui/material/TablePagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import axios from "axios";
import "../config";
import { maxWidth } from "@mui/system";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { listSubheaderClasses, Typography } from "@mui/material";


const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 420,
  // height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

const defaultValues = {
  title: "",
  description: "",
  img: ""
};

function AdsPage({ value }) {
  const [formValues, setFormValues] = React.useState(defaultValues);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [list, setList] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(" ");
  const [img, setImg] = React.useState(
    " asd"
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    console.log(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formValues.title);
    console.log(formValues.description);
    console.log(img);
    axios
    .post(
      "https://localhost:8000/create-ad/",
      {
        title: formValues.title,
        description: formValues.description,
        img: img,
      },
      {
        headers: { token: global.config.user.token },
      }
    )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });




  };


  function loadAds(data) {
    setList(data);
  }

  // if (value) {
  //   console.log(value);
  // } else {
  //   console.log("no value");
  // }


  useEffect(() => {
    if (value) {
      axios
        .get("https://localhost:8000/ads/", {
          params: {
          },
        })
        .then((res) => loadAds(res.data))
        .catch(console.log);
    } else {
      axios
        .get("https://localhost:8000/ads/", {
          headers: { token: global.config.user.token },
          params: {
          },
        })
        .then((res) => loadAds(res.data))
        .catch(console.log);
    }

  
  }, [value]);

  if (!list.length) return <div>Loading...</div>;
  function uploadImage(e) {
    console.log(e.target.files[0].name);
    setImg(e.target.files[0].name);
}
  return (
    <center>
      <div style={{height:20}}></div>
      <div>
      <DemoPaper square={false}>
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
              id="title"
              name="title"
              type="text"
              onChange={handleInputChange}
              label="Add a title"
            />
            <TextField
              required
              id="description"
              name="description"
              type="text"
              onChange={handleInputChange}
              label="Description"
            />
            <div>
              select Image:  
              <input type="file" onChange={uploadImage} />
            </div>
            <div style={{height:20}}></div>
            <Button disabled={false} variant="outlined" type="submit">
              Submit
            </Button>
            </Box>
        </DemoPaper>
      </div>
      <div>
        <div>{global.config.user.token}</div>
        <div className="center">
          {" "}
          
        </div>
        {list
          .map((item) => (
            <BasicCard
              id = {item.id} 
              username = {global.config.user.role} 
              img={"/"+item.img}
              title={item.title}
              description={item.description}
              interested_users={item.interested_users}
              
            />
          ))}
      </div>
      {/* <TablePagination
        component="div"
        count={parseInt(list[0].id)}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </center>
  );
}

export default AdsPage;
