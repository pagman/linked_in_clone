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

function HomePage({ value }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [list, setList] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(" ");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
    if (event.target.value === "all") {
      axios
        .get("https://localhost:8000/posts/", {
          headers: { token: global.config.user.token },
          params: {
            token: "aA"
          },
        })
        .then((res) => loadAuctions(res.data))
        .catch(console.log);
    } else {
      axios
        .get(
          "https://localhost:8000/posts/",
          {
            headers: { token: global.config.user.token },
            params: {
              token: "aA"
            },
          }
        )
        .then((res) => loadAuctions(res.data))
        .catch(console.log);
    }
  };

  function loadAuctions(data) {
    setList(data);
  }

  if (value) {
    console.log(value);
  } else {
    console.log("no value");
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (value) {
      axios
        .get("https://localhost:8000/posts/", {
          params: {
          },
        })
        .then((res) => loadAuctions(res.data))
        .catch(console.log);
    } else {
      axios
        .get("https://localhost:8000/posts/", {
          headers: { token: global.config.user.token },
          params: {
          },
        })
        .then((res) => loadAuctions(res.data))
        .catch(console.log);
    }

  
  }, [value]);

  if (!list.length) return <div>Loading...</div>;

  return (
    <center>
      <div>
        <div>{global.config.user.token}</div>
        <div className="center">
          {" "}
          
        </div>
        {list
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <BasicCard
              id = {item.id} 
              username = {global.config.user.role} 
              img={item.img}
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

export default HomePage;
