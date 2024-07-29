import * as React from "react";
import { useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import UserCard from "../components/userCard";
import axios from "axios";
import "../config";
import Button from "@mui/material/Button";



function AllUsersPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [list, setList] = React.useState([]);

  function loadUsers(data) {
    setList(data);
  }

  const handleDownload = () => {
    console.log('pressed')
    axios.get("https://localhost:8000/users/", {
      headers: { token: global.config.user.token, 'media-type': 'application/xml' },      
    })
    .then((response) => response.data)
  .then((blob) => {
    // Create blob link to download
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      list.name+".xml"
    );
    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    // Clean up and remove the link
    link.parentNode.removeChild(link);
  });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 50));
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("https://localhost:8000/users/", {
        headers: { token: global.config.user.token },
      })
      .then((res) => loadUsers(res.data))
      .catch(console.log);
  });

  if (!list.length) return <div>Loading...</div>;

  return (
    <center>
      <div className="center">
        <div>All users page</div>
        {list
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <UserCard
              key={item.id}
              id={item.id}
              username={item.username}
              validated = {item.validated}
            />
          ))}
          
      </div>
      <TablePagination
        component="div"
        count={list.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div>
      <Button
                    disabled={false}
                    variant="contained"
                    color="error"
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
      </div>
    </center>
  );
}

export default AllUsersPage;
