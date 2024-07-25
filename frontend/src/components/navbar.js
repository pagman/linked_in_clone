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
  }
  if (cookies.get("role") === "User") {
    setShowing(true);
  }

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value)
};


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
            <Link style={{ textDecoration: "none" }} to="/chat/0">
              <Button
                variant="text"
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Network
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
            <Link style={{ textDecoration: "none" }} to="/chat/0">
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
            <Link style={{ textDecoration: "none" }} to="/myaccount">
              <Button
                variant="text"
                style={{
                  color: "white",
                  fontSize: "15px",
                }}
              >
                My Account
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
          <Search
            onClick={() => {
              console.log(value);
            }}
          >
            <SearchIconWrapper>
              <SearchIcon  />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleChange}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
