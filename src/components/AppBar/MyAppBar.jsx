import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Avatar } from "@material-ui/core";
import Axios from "axios";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import { Badge } from "@material-ui/core";
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';

export default function MyAppBar() {
  // const [dataMessages, setdataMessages] = useState([]);
  // const [isLoading, setisLoading] = useState(true);

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getMessages = async () => {
  //   const id = window.localStorage.getItem("uuid");
  //   await Axios.get(`http://localhost:8080/users/${id}`).then(
  //     (res) => setdataMessages(res.data),
  //     setisLoading(false)
  //   );
  // };

  // useEffect(() => {
  //   setInterval(() => {
  //     getMessages();
  //   }, 1000);
  // }, []);

  // const getUser = async () => {
  //   const id = window.localStorage.getItem("uuid");

  //   try {
  //     const res = await Axios.get(
  //       `https://virusclicker.herokuapp.com/users/${id}`
  //     );
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setisLoading(false);
  //   }
  // };

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            {/* <Avatar
              alt="Temy Sharp"
              src={dataMessages.avatar}
              style={{ width: "50px", height: "50px" }}
            /> */}
            {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
            <MailIcon />
            </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
            </Badge>
            </IconButton>
            <IconButton
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen}
            color="inherit"
            >
            <AccountCircle />
            </IconButton>
          <IconButton
          aria-label="show more"
          // aria-controls={mobileMenuId}
            aria-haspopup="true"
            // onClick={handleMobileMenuOpen}
            color="inherit"
          >
          <MoreIcon />
          </IconButton> */}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
