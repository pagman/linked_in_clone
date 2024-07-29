import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Cookies from "universal-cookie";
import "../config";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({
  value,
  setValue,
  showing,
  showingAdmin,
  setShowing,
  setShowingAdmin,
}) {
  const cookies = new Cookies();
  
  if (cookies.get("role") === "admin") {
    setShowingAdmin(true);
    setShowing(true);
  }else if (typeof cookies.get("role")=== 'string') {
    setShowing(true);
  }

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value)
};
const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link style={{ textDecoration: "none" }} to="/myaccount">        
      <ListItem key="1" disablePadding>
            <ListItemButton>              
              <ListItemText primary="My Account" />
            </ListItemButton>
          </ListItem>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/network">
          <ListItem key="2" disablePadding>
            <ListItemButton>              
              <ListItemText primary="Network" />
            </ListItemButton>
          </ListItem>    
          </Link>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Button style={{ color: "white" }} variant="outlined"  onClick={toggleDrawer(true) }><MenuIcon/></Button>
            <Link style={{ color: "white", textDecoration: "none" }} to="/">
              Ergasia TEDI
            </Link>
          </Typography>
          

          {/* <Link style={{ textDecoration: "none" }} to="/signin">
            <Button
              variant="text"
              style={{
                color: "white",
                fontSize: "15px",
              }}
            >
              Sign in
            </Button>
          </Link> */}
          {!showing ? (
            <Link style={{ textDecoration: "none" }} to="/signin">
              <Button
                variant="text"
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Sign in
              </Button>
            </Link>
          ) : null}
          {showing ? (
            <Link style={{ textDecoration: "none" }} to="/signin">
              <Button
                variant="text"
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Sign out
              </Button>
            </Link>
          ) : null}
          {showingAdmin ? (
            <Link style={{ textDecoration: "none" }} to="/allusers">
              <Button
                variant="text"
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
              >
                AllUsers
              </Button>
            </Link>
          ) : null}
          {showing ? (
            <Link style={{ textDecoration: "none" }} to="/ads">
              <Button
                variant="text"
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Ads
              </Button>
            </Link>
          ) : null}
          {showing ? (
            <Link style={{ textDecoration: "none" }} to="/chat/0">
              <Button
                variant="text"
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Chat
              </Button>
            </Link>
          ) : null}
          {showing ? (
            <Link style={{ textDecoration: "none" }} to="/notifications">
              <Button
                variant="text"
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Notifications
              </Button>
            </Link>
          ) : null}
          {showing ? (
            <Link style={{ textDecoration: "none" }} to="/settings">
              <Button
                variant="text"
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Settings
              </Button>
            </Link>
          ) : null}
          <div>
      
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
