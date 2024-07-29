import * as React from "react";
import { useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import FriendsCard from "../components/friendsCard";
import AllCommentsCard from "../components/allCommentsCard";
import axios from "axios";
import "../config";



function NotificationsPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [list, setList] = React.useState([]);
  const [interest, setInterest] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  function loadUsers(data) {
    setList(data);
  }
  function loadInterest(data) {
    setInterest(data);
  }
  function loadComments(data) {
    setComments(data);

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 50));
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("https://localhost:8000/users/"+global.config.user.id+"/pending-friends", {
        headers: { token: global.config.user.token },
      })
      .then((res) => loadUsers(res.data))
      .catch(console.log);
  },[]);

  useEffect(() => {
    axios
      .get("https://localhost:8000/posts/", {
        headers: { token: global.config.user.token },
      })
      .then((res) => loadComments(res.data))
      .catch(console.log);
  },[]);

  useEffect(() => {
    axios
      .get("https://localhost:8000/ads/", {
        headers: { token: global.config.user.token },
      })
      .then((res) => loadInterest(res.data))
      .catch(console.log);
  },[]);

  // console.log(comments)

  // if (!list.length) return <div>Nothing to load...</div>;

  return (
    <center>
      <div className="center">
      <div>{global.config.user.token}</div>
        <div>Friend requests</div>
        {list
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <FriendsCard
              key={item.id}
              id={item.id}
              username={item.requestee_name}
              validated = {item.status}
              user={item.requester_id}
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
      <div className="center">
        <div>
          Comment
        </div>
        {comments.filter(item => item.comments.length > 0)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <AllCommentsCard
              key={item.id}
              id={item.id}
              title={item.title}
              comments={item.comments}
            />
          ))}
      <TablePagination
        component="div"
        count={list.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
      <div className="center">
        <div>
          Interest
        </div>
        {interest.filter(item => item.interested_users.length > 0)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <AllCommentsCard
              key={item.id}
              id={item.id}
              title={item.title}
              comments={item.interested_users}
            />
          ))}
      <TablePagination
        component="div"
        count={list.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
    </center>

  );
}

export default NotificationsPage;
