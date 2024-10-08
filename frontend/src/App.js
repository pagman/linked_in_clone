import "./App.css";
import * as React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Network from "./pages/Network";
import AdsPage from "./pages/Adspage";
import SigninPage from "./pages/Signin";
import AccountPage from "./pages/Account";
import SearchAppBar from "./components/navbar";
import PersonalPage from "./pages/PersonalPage";
import AllUsersPage from "./pages/AllUsers";
import Chat from "./pages/Chat";
import UserDetailsPage from "./pages/UserDetails";
import NotificationsPage from "./pages/Notifications";
import MyAccountPage from "./pages/MyAccountPage";
import AddAuctionPage from "./pages/AddAuctionPage";
import EditAuctionPage from "./pages/EditAuctionPage";
import SettingsPage from "./pages/Settings";
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
  global.config.user.id = cookies.get("id");

  useEffect(() => {
    document.title = "tedi"
  }, [])


  


  return (
    <div>      
      <SearchAppBar value={value} setValue={setValue} showing={showing} showingAdmin={showingAdmin} setShowing={setShowing}  setShowingAdmin={setShowingAdmin} />
      <Routes>
        <Route path="/" element={<HomePage value={value} />} />
        <Route path="/network" element={<Network value={value} />} />
        <Route path="/ads" element={<AdsPage value={value} />} />
        {/* <Route path="/" element={<SigninPage setShowing={setShowing}  setShowingAdmin={setShowingAdmin} />} /> */}
        <Route path="/account/" element={<AccountPage />} />
        <Route path="/signin" element={<SigninPage setShowing={setShowing}  setShowingAdmin={setShowingAdmin}/>} />
        {/* <Route path="/product/:id" element={<ProductPage />} /> */}
        <Route path="/allusers" element={<AllUsersPage />} />
        <Route exact path="/chat/:id" element={<Chat />} />
        <Route path="/myaccount" element={<PersonalPage />} />
        <Route path="/addauction" element={<AddAuctionPage />} />
        <Route exact path="/editauction/:id" element={<EditAuctionPage />} />
        <Route exact path="/userdetails/:id" element={<UserDetailsPage />} />
        <Route exact path="/settings/" element={<SettingsPage />} />
        <Route exact path="/notifications/" element={<NotificationsPage />} />
      </Routes>
    </div>
  );
}

export default App;
