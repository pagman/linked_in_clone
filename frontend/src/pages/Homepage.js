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
        .get("http://localhost:8080/auctions/", {
          headers: { token: global.config.user.token },
          params: {
            skip: page * rowsPerPage,
            limit: page * rowsPerPage + rowsPerPage,
            order_by: "ends"
          },
        })
        .then((res) => loadAuctions(res.data))
        .catch(console.log);
    } else {
      axios
        .get(
          "http://localhost:8080/Search-auction/?category=%5B%22" +
            event.target.value +
            "%22%5D",
          {
            headers: { token: global.config.user.token },
            params: {
              skip: page * rowsPerPage,
              limit: page * rowsPerPage + rowsPerPage,
              order_by: "ends"
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
        .get("http://localhost:8080/Search-auction/", {
          params: {
            free_text: value,
            skip: page * rowsPerPage,
            limit: page * rowsPerPage + rowsPerPage,
            order_by: "ends"
          },
        })
        .then((res) => loadAuctions(res.data))
        .catch(console.log);
    } else {
      axios
        .get("http://localhost:8080/auctions/", {
          headers: { token: global.config.user.token },
          params: {
            skip: page * rowsPerPage,
            limit: page * rowsPerPage + rowsPerPage,
            order_by: "ends"
          },
        })
        .then((res) => loadAuctions(res.data))
        .catch(console.log);
    }

    axios
      .get("http://localhost:8080/categories/", {})
      .then((res) => {
        setCategory(res.data);
      })
      .catch(console.log);
  }, [value]);

  if (!list.length) return <div>Loading...</div>;

  return (
    <center>
      <div>
        <div>{global.config.user.token}</div>
        <div className="center">
          {" "}
          <Select  defaultValue="all" label="Age" onChange={handleChange}> 
            {category.map((item) => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
            <MenuItem value="all">All</MenuItem>
          </Select>
        </div>
        {list
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <BasicCard
              key={item.id}
              header={item.buy_price + "€"}
              // image={item.photos[0].URL}
              title={item.name.slice(0, 50)}
              categories={item.categories[0].name}
              description={item.description.slice(0, 50)}
              id={item.id}
            />
          ))}
      </div>
      <TablePagination
        component="div"
        count={parseInt(list[0].id)}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </center>
  );
}

export default HomePage;
