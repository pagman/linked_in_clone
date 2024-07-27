import * as React from "react";
import { useEffect } from "react";
import UsersCard from "../components/UsersCard";
import AddPost from "../components/addPost";
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


function Network({ value }) {
  const [list, setList] = React.useState([]);
  const [friends, setfriends] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(" ");


  function loadUsers(data) {
    setList(data);
  }

  function loadFriends(data) {
    // console.log("-----------------")
    // console.log(data[0].requestee_name)
    // console.log("-----------------")
    setfriends(data);
  }

  if (value) {
    console.log(value);
  } else {
    console.log("no value");
  }


  useEffect(() => {
    if (value) {
      axios
        .get("https://localhost:8000/posts/", {
          params: {
          },
        })
        .then((res) => loadUsers(res.data))
        .catch(console.log);
    } else {
      axios
        .get("https://localhost:8000/users/", {
          headers: { token: global.config.user.token },
          params: {
          },
        })
        .then((res) => loadUsers(res.data))
        .catch(console.log);
    }

  
  }, [value]);

  useEffect(() => {
   axios
        .get("https://localhost:8000/users/"+global.config.user.id+"/friends", {
          headers: { token: global.config.user.token },
          params: {
          },
        })
        .then((res) => loadFriends(res.data))
        .catch(console.log);
    

  
  }, [value]);

  if (!list.length) return <div>Loading...</div>;

  


  return (
    <center>
      <div>
        <div></div>
        <div className="center">
          {"Network"}          
        </div>
        <div className="center">
          {global.config.user.token}          
        </div>
        

        {list.map((item) => (
            <UsersCard
              id = {item.id} 
              username = {item.username} 
              usernamerole = {global.config.user.role} 
              img={item.img}
              name={item.name}
              surname={item.surname}
              work_exp={item.work_exp}
              work_exp_visible={item.work_exp_visible}
              education={item.education}
              education_visible={item.education_visible}
              expertise={item.expertise}
              expertise_visible={item.expertise_visible}
              visible={true}
              friends={friends}
              
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

export default Network;
