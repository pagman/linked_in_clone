import "./App.css";
import * as React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SigninPage from "./pages/Signin";
import AccountPage from "./pages/Account";
import SearchAppBar from "./components/navbar";
import ProductPage from "./pages/productPage";
import AllUsersPage from "./pages/AllUsers";
import Chat from "./pages/Chat";
import UserDetailsPage from "./pages/UserDetails";
import MyAccountPage from "./pages/MyAccountPage";
import AddAuctionPage from "./pages/AddAuctionPage";
import EditAuctionPage from "./pages/EditAuctionPage";
import Cookies from "universal-cookie";
import "./config"


function App() {
  const [showingAdmin, setShowingAdmin] = React.useState(false);
  const [showing, setShowing] = React.useState(false);
  const [value, setValue] = React.useState('');
  const cookies = new Cookies();

  console.log(cookies.get("token")); // Pacman
  console.log(cookies.get("role")); // Pacman

  global.config.user.token = cookies.get("token");
  global.config.user.role = cookies.get("role");

  useEffect(() => {
    document.title = "Auction site"
  }, [])


  


  return (
    <div>      
      <SearchAppBar value={value} setValue={setValue} showing={showing} showingAdmin={showingAdmin} setShowing={setShowing}  setShowingAdmin={setShowingAdmin} />
      <Routes>
        <Route path="/" element={<HomePage value={value} />} />
        {/* <Route path="/" element={<SigninPage setShowing={setShowing}  setShowingAdmin={setShowingAdmin} />} /> */}
        <Route path="/account/" element={<AccountPage />} />
        <Route path="/signin" element={<SigninPage setShowing={setShowing}  setShowingAdmin={setShowingAdmin}/>} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/allusers" element={<AllUsersPage />} />
        <Route exact path="/chat/:id" element={<Chat />} />
        <Route path="/myaccount" element={<MyAccountPage />} />
        <Route path="/addauction" element={<AddAuctionPage />} />
        <Route exact path="/editauction/:id" element={<EditAuctionPage />} />
        <Route exact path="/userdetails/:id" element={<UserDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
