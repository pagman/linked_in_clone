import * as React from "react";
import EditCard from "../components/EditCard";
import TablePagination from "@mui/material/TablePagination";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import "../config";

function MyAccountPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState("My Auctions");
  const [list, setList] = React.useState([]);
  const [urlType, setUrlType] = React.useState("users-auction/");

  function loadAuctions(data) {
    console.log(data);
    setList(data);
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (anchor === "My Auctions") {
      setUrlType("users-auction/");
    } else {
      console.log("win");
      setUrlType("auction-wins/");
    }

    setState(anchor);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/" + urlType, {
        headers: { token: global.config.user.token },
      })
      .then((res) => loadAuctions(res.data))
      .catch(console.log);
  }, [urlType]);

  if (!list.length)
    return (
      <center>
        <div>
          {["My Auctions", "Winning Auctions"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            </React.Fragment>
          ))}
        </div>
        <br></br>
        <div>No winning auctions ...</div>
        <br></br>
        <Link style={{ textDecoration: "none" }} to="/addauction">
          <Fab className="fab" color="secondary" aria-label="edit">
            <AddIcon />
          </Fab>
        </Link>
      </center>
    );

  return (
    <center>
      <div>
        {["My Auctions", "Winning Auctions"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          </React.Fragment>
        ))}
      </div>
      <div>
        <div>My Account</div>
        {list
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <EditCard
              key={item.id}
              header={item.buy_price + "€"}
              // image={item.photos[0].URL}
              title={item.name.slice(0, 50)}
              categories={item.categories[0].name}
              description={item.description.slice(0, 50)}
              id={item.id}
            />
          ))}
        <Link style={{ textDecoration: "none" }} to="/addauction">
          <Fab className="fab" color="secondary" aria-label="edit">
            <AddIcon />
          </Fab>
        </Link>
        
      </div>
      <TablePagination
        component="div"
        count={list.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </center>
  );
}

export default MyAccountPage;
