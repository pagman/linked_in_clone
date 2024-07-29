import * as React from "react";
import { useEffect } from "react";
import Post from "../components/Post";
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


function HomePage({ value }) {
  const [list, setList] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(" ");


  function loadPosts(data) {
    setList(data);
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
        .then((res) => loadPosts(res.data))
        .catch(console.log);
    } else {
      axios
        .get("https://localhost:8000/posts/", {
          headers: { token: global.config.user.token },
          params: {
          },
        })
        .then((res) => loadPosts(res.data))
        .catch(console.log);
    }

  
  }, [value]);

  if (!list.length) return <div>Loading...</div>;

  


  return (
    <center>
      <div>
        <div></div>
        <div className="center">
          {global.config.user.token}
          <AddPost
          inactive={false}>          
          </AddPost>
          
        </div>
        

        {list.map((item) => (
            <Post
              id = {item.id} 
              username = {global.config.user.role} 
              img={item.img}
              title={item.title}
              description={item.description}
              audio={item.audio}
              video={item.video}
              interested_users={item.interested_users}
              comments={item.comments}
              
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
